import Database from 'better-sqlite3';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync, mkdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function createAuditLogger(config) {
  const dbPath = config.audit?.dbPath || join(__dirname, '..', 'data', 'audit.sqlite');
  const dir = dirname(dbPath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');

  db.exec(`
    CREATE TABLE IF NOT EXISTS audit_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp TEXT DEFAULT (datetime('now')),
      device_id TEXT,
      model TEXT,
      routed_model TEXT,
      prompt_tokens INTEGER DEFAULT 0,
      completion_tokens INTEGER DEFAULT 0,
      total_tokens INTEGER DEFAULT 0,
      latency_ms INTEGER DEFAULT 0,
      cost_usd REAL DEFAULT 0,
      status TEXT,
      error TEXT
    )
  `);

  const insertStmt = db.prepare(`
    INSERT INTO audit_log (device_id, model, routed_model, prompt_tokens, completion_tokens, total_tokens, latency_ms, cost_usd, status, error)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  function log(entry) {
    if (config.audit?.enabled === false) return;
    insertStmt.run(
      entry.deviceId || 'unknown',
      entry.model || '',
      entry.routedModel || '',
      entry.promptTokens || 0,
      entry.completionTokens || 0,
      entry.totalTokens || 0,
      entry.latencyMs || 0,
      entry.costUsd || 0,
      entry.status || 'unknown',
      entry.error || null,
    );
  }

  function query(limit = 100) {
    return db.prepare('SELECT * FROM audit_log ORDER BY id DESC LIMIT ?').all(limit);
  }

  function getMetrics() {
    const row = db.prepare(`
      SELECT
        COUNT(*) as total_requests,
        SUM(total_tokens) as total_tokens,
        SUM(cost_usd) as total_cost_usd,
        AVG(latency_ms) as avg_latency_ms,
        SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) as success_count,
        SUM(CASE WHEN status = 'error' THEN 1 ELSE 0 END) as error_count,
        COUNT(DISTINCT device_id) as unique_devices
      FROM audit_log
    `).get();

    const byModel = db.prepare(`
      SELECT model, COUNT(*) as requests, SUM(total_tokens) as tokens, SUM(cost_usd) as cost_usd
      FROM audit_log GROUP BY model ORDER BY requests DESC
    `).all();

    const byDevice = db.prepare(`
      SELECT device_id, COUNT(*) as requests, SUM(total_tokens) as tokens, SUM(cost_usd) as cost_usd
      FROM audit_log GROUP BY device_id ORDER BY requests DESC LIMIT 20
    `).all();

    return { summary: row, byModel, byDevice };
  }

  return { log, query, getMetrics };
}
