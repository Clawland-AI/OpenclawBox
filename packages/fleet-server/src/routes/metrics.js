import { Router } from 'express';

export function createMetricsRoutes(db) {
  const router = Router();

  router.post('/metrics/ingest', (req, res) => {
    const { metrics } = req.body;
    if (!Array.isArray(metrics)) {
      return res.status(400).json({ error: 'metrics array required' });
    }

    const stmt = db.prepare(
      'INSERT INTO metrics (device_id, model, tokens, latency_ms, cost_usd, status, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)'
    );

    const insertMany = db.transaction((items) => {
      for (const m of items) {
        stmt.run(m.deviceId, m.model, m.tokens || 0, m.latencyMs || 0, m.costUsd || 0, m.status, m.timestamp);
      }
    });
    insertMany(metrics);

    res.json({ ingested: metrics.length });
  });

  router.get('/metrics', (_req, res) => {
    const summary = db.prepare(`
      SELECT
        COUNT(*) as total_requests,
        SUM(tokens) as total_tokens,
        SUM(cost_usd) as total_cost_usd,
        AVG(latency_ms) as avg_latency_ms,
        COUNT(DISTINCT device_id) as active_devices
      FROM metrics
      WHERE timestamp > datetime('now', '-24 hours')
    `).get();

    const byDevice = db.prepare(`
      SELECT device_id, COUNT(*) as requests, SUM(tokens) as tokens, SUM(cost_usd) as cost_usd
      FROM metrics WHERE timestamp > datetime('now', '-24 hours')
      GROUP BY device_id ORDER BY requests DESC LIMIT 20
    `).all();

    const byModel = db.prepare(`
      SELECT model, COUNT(*) as requests, SUM(tokens) as tokens, SUM(cost_usd) as cost_usd
      FROM metrics WHERE timestamp > datetime('now', '-24 hours')
      GROUP BY model ORDER BY requests DESC
    `).all();

    const hourly = db.prepare(`
      SELECT strftime('%Y-%m-%d %H:00', timestamp) as hour,
             COUNT(*) as requests, SUM(tokens) as tokens, SUM(cost_usd) as cost_usd
      FROM metrics WHERE timestamp > datetime('now', '-24 hours')
      GROUP BY hour ORDER BY hour
    `).all();

    res.json({ summary, byDevice, byModel, hourly });
  });

  return router;
}
