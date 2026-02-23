import express from 'express';
import cors from 'cors';
import { readFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import { createMockProvider } from './mock-provider.js';
import { createDeviceRateLimiter } from './device-ratelimit.js';
import { createAuditLogger } from './audit.js';
import { createMetricsBridge } from './metrics-bridge.js';
import { createConfigBridge } from './config-bridge.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadConfig() {
  const configPath = process.env.CHEAPROUTER_CONFIG
    || join(__dirname, '..', 'config.example.json');
  const raw = readFileSync(configPath, 'utf-8');
  const config = JSON.parse(raw);
  config.port = parseInt(process.env.PORT || config.port || 4000, 10);
  config.demoMode = process.env.DEMO_MODE === 'true' || config.demoMode === true;
  config.fleetServerUrl = process.env.FLEET_SERVER_URL || config.fleetServerUrl || 'http://localhost:4100';
  return config;
}

export function createServer(config) {
  const app = express();
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));

  const dataDir = join(__dirname, '..', 'data');
  if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });

  const audit = createAuditLogger(config);
  const rateLimiter = createDeviceRateLimiter(config);
  const metricsBridge = createMetricsBridge(config);
  const configBridge = createConfigBridge(config);
  const mockProvider = createMockProvider(config);

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', version: '0.1.0', demoMode: config.demoMode });
  });

  app.get('/v1/models', (_req, res) => {
    const models = [
      { id: 'blockrun/auto', name: 'Auto (Balanced)', owned_by: 'clawrouter' },
      { id: 'blockrun/eco', name: 'Eco (Cheapest)', owned_by: 'clawrouter' },
      { id: 'blockrun/premium', name: 'Premium (Best)', owned_by: 'clawrouter' },
      { id: 'blockrun/free', name: 'Free Tier', owned_by: 'clawrouter' },
      { id: 'mock/default', name: 'Mock Provider', owned_by: 'cheaprouter' },
    ];
    res.json({ object: 'list', data: models.map(m => ({ ...m, object: 'model' })) });
  });

  app.post('/v1/chat/completions', async (req, res) => {
    const startTime = Date.now();
    const deviceId = req.headers['x-device-id'] || 'anonymous';
    const requestedModel = req.body.model || 'blockrun/auto';
    const stream = req.body.stream === true;

    const rateCheck = rateLimiter.check(deviceId);
    if (!rateCheck.allowed) {
      return res.status(429).json({
        error: {
          message: `Rate limit exceeded for device ${deviceId}. Retry after ${rateCheck.retryAfterMs}ms`,
          type: 'rate_limit_error',
          code: 'rate_limit_exceeded',
        },
      });
    }

    try {
      const profile = await configBridge.getProfile(deviceId);
      const effectiveModel = profile?.routingProfile
        ? `blockrun/${profile.routingProfile}`
        : requestedModel;

      let result;
      if (config.demoMode || effectiveModel.startsWith('mock/')) {
        result = await mockProvider.complete(req.body, effectiveModel);
      } else {
        result = await mockProvider.complete(req.body, effectiveModel);
      }

      const latencyMs = Date.now() - startTime;
      const tokenUsage = result.usage || { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 };

      rateLimiter.record(deviceId, tokenUsage.total_tokens);

      audit.log({
        deviceId,
        model: effectiveModel,
        routedModel: result._routedModel || effectiveModel,
        promptTokens: tokenUsage.prompt_tokens,
        completionTokens: tokenUsage.completion_tokens,
        totalTokens: tokenUsage.total_tokens,
        latencyMs,
        status: 'success',
        costUsd: result._costUsd || 0,
      });

      metricsBridge.report({
        deviceId,
        model: effectiveModel,
        tokens: tokenUsage.total_tokens,
        latencyMs,
        costUsd: result._costUsd || 0,
        status: 'success',
      });

      if (stream) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        const chunk = {
          id: result.id,
          object: 'chat.completion.chunk',
          created: result.created,
          model: result.model,
          choices: [{
            index: 0,
            delta: { role: 'assistant', content: result.choices[0].message.content },
            finish_reason: null,
          }],
        };
        res.write(`data: ${JSON.stringify(chunk)}\n\n`);

        const doneChunk = {
          id: result.id,
          object: 'chat.completion.chunk',
          created: result.created,
          model: result.model,
          choices: [{ index: 0, delta: {}, finish_reason: 'stop' }],
        };
        res.write(`data: ${JSON.stringify(doneChunk)}\n\n`);
        res.write('data: [DONE]\n\n');
        return res.end();
      }

      delete result._routedModel;
      delete result._costUsd;
      return res.json(result);

    } catch (err) {
      const latencyMs = Date.now() - startTime;
      audit.log({
        deviceId,
        model: requestedModel,
        latencyMs,
        status: 'error',
        error: err.message,
      });
      return res.status(502).json({
        error: { message: err.message, type: 'upstream_error', code: 'provider_error' },
      });
    }
  });

  app.get('/v1/audit', (_req, res) => {
    const limit = parseInt(_req.query.limit || '100', 10);
    const logs = audit.query(limit);
    res.json({ data: logs, count: logs.length });
  });

  app.get('/v1/metrics', (_req, res) => {
    const metrics = audit.getMetrics();
    res.json(metrics);
  });

  return app;
}

const config = loadConfig();
const app = createServer(config);

app.listen(config.port, () => {
  console.log(`[CheapRouter] running on port ${config.port} | demo=${config.demoMode}`);
  console.log(`[CheapRouter] OpenAI-compatible endpoint: http://localhost:${config.port}/v1/chat/completions`);
  if (config.demoMode) {
    console.log('[CheapRouter] Demo mode active — using mock provider (no API keys required)');
  }
});
