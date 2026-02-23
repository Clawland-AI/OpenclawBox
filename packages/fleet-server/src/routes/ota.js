import { Router } from 'express';

export function createOtaRoutes(db) {
  const router = Router();

  router.post('/ota/trigger', (req, res) => {
    const { deviceId, targetVersion } = req.body;
    if (!deviceId || !targetVersion) {
      return res.status(400).json({ error: 'deviceId and targetVersion are required' });
    }

    const device = db.prepare('SELECT * FROM devices WHERE device_id = ?').get(deviceId);
    if (!device) return res.status(404).json({ error: 'Device not found' });

    const result = db.prepare(
      'INSERT INTO ota_jobs (device_id, target_version) VALUES (?, ?)'
    ).run(deviceId, targetVersion);

    res.json({ jobId: result.lastInsertRowid, deviceId, targetVersion, status: 'pending' });
  });

  router.post('/ota/ack', (req, res) => {
    const { jobId, status } = req.body;
    if (!jobId) return res.status(400).json({ error: 'jobId is required' });

    db.prepare(
      "UPDATE ota_jobs SET status = ?, updated_at = datetime('now') WHERE id = ?"
    ).run(status || 'completed', jobId);

    res.json({ ack: true, jobId });
  });

  router.get('/ota/status', (req, res) => {
    const { deviceId } = req.query;
    let jobs;
    if (deviceId) {
      jobs = db.prepare('SELECT * FROM ota_jobs WHERE device_id = ? ORDER BY id DESC LIMIT 10').all(deviceId);
    } else {
      jobs = db.prepare('SELECT * FROM ota_jobs ORDER BY id DESC LIMIT 50').all();
    }
    res.json({ data: jobs });
  });

  return router;
}
