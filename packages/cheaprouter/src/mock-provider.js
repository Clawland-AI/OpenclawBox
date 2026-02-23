import { randomUUID } from 'crypto';

const MODEL_PRICING = {
  'blockrun/eco':     { input: 0.10, output: 0.40, model: 'gemini-2.5-flash-lite' },
  'blockrun/auto':    { input: 0.60, output: 3.00, model: 'kimi-k2.5' },
  'blockrun/premium': { input: 5.00, output: 25.00, model: 'claude-opus-4.5' },
  'blockrun/free':    { input: 0.00, output: 0.00, model: 'gpt-oss-120b' },
  'mock/default':     { input: 0.00, output: 0.00, model: 'mock-v1' },
};

const MOCK_RESPONSES = [
  "I'd be happy to help with that! Based on my analysis, here's what I recommend...",
  "That's a great question. Let me break it down for you step by step.",
  "Here's a concise answer: the key factors to consider are efficiency, cost, and reliability.",
  "I've processed your request. The result shows optimal performance with minimal resource usage.",
  "Let me provide a detailed response. First, let's consider the underlying architecture...",
];

function estimateTokens(text) {
  return Math.ceil((text || '').length / 4);
}

export function createMockProvider(config) {
  const latencyMs = config.providers?.mock?.latencyMs || 200;

  async function complete(body, requestedModel) {
    await new Promise(r => setTimeout(r, latencyMs + Math.random() * 100));

    const pricing = MODEL_PRICING[requestedModel] || MODEL_PRICING['mock/default'];
    const messages = body.messages || [];
    const lastMessage = messages[messages.length - 1]?.content || '';

    const promptTokens = messages.reduce((sum, m) => sum + estimateTokens(m.content), 0);
    const responseText = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
    const completionTokens = estimateTokens(responseText);
    const totalTokens = promptTokens + completionTokens;

    const costUsd = (promptTokens * pricing.input + completionTokens * pricing.output) / 1_000_000;

    return {
      id: `chatcmpl-${randomUUID().slice(0, 12)}`,
      object: 'chat.completion',
      created: Math.floor(Date.now() / 1000),
      model: pricing.model,
      choices: [{
        index: 0,
        message: { role: 'assistant', content: responseText },
        finish_reason: 'stop',
      }],
      usage: {
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        total_tokens: totalTokens,
      },
      _routedModel: pricing.model,
      _costUsd: costUsd,
    };
  }

  return { complete, MODEL_PRICING };
}
