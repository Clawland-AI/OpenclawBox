import { Router } from 'express';

export function createHeartbeatRoutes(db) {
  const router = Router();

  const upsertDevice = db.prepare(`
    INSERT INTO devices (device_id, version, status, last_heartbeat, last_error, ip_address, updated_at)
    VALUES (?, ?, 'online', datetime('now'), ?, ?, datetime('now'))
    ON CONFLICT(device_id) DO UPDATE SET
      version = excluded.version,
      status = 'online',
      last_heartbeat = datetime('now'),
      last_error = excluded.last_error,
      ip_address = excluded.ip_address,
      updated_at = datetime('now')
  `);

  router.post('/heartbeat', (req, res) => {
    const { deviceId, version, lastError, name } = req.body;
    if (!deviceId) {
      return res.status(400).json({ error: 'deviceId is required' });
    }

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    upsertDevice.run(deviceId, version || '0.0.0', lastError || null, ip);

    if (name) {
      db.prepare('UPDATE devices SET name = ? WHERE device_id = ?').run(name, deviceId);
    }

    const pendingOta = db.prepare(
      "SELECT * FROM ota_jobs WHERE device_id = ? AND status = 'pending' ORDER BY id DESC LIMIT 1"
    ).get(deviceId);

    const configRow = db.prepare('SELECT config_json FROM devices WHERE device_id = ?').get(deviceId);
    let config = {};
    try { config = JSON.parse(configRow?.config_json || '{}'); } catch { /* ignore */ }

    res.json({
      ack: true,
      pendingOta: pendingOta ? { jobId: pendingOta.id, targetVersion: pendingOta.target_version } : null,
      config,
    });
  });

  return router;
}
