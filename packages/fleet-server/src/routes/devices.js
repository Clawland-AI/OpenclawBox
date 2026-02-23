import { Router } from 'express';

export function createDeviceRoutes(db) {
  const router = Router();

  router.get('/devices', (_req, res) => {
    db.prepare(`
      UPDATE devices SET status = 'offline'
      WHERE last_heartbeat < datetime('now', '-2 minutes') AND status = 'online'
    `).run();

    const devices = db.prepare('SELECT * FROM devices ORDER BY last_heartbeat DESC').all();
    res.json({ data: devices, count: devices.length });
  });

  router.get('/devices/:deviceId', (req, res) => {
    const device = db.prepare('SELECT * FROM devices WHERE device_id = ?').get(req.params.deviceId);
    if (!device) return res.status(404).json({ error: 'Device not found' });
    res.json(device);
  });

  router.delete('/devices/:deviceId', (req, res) => {
    db.prepare('DELETE FROM devices WHERE device_id = ?').run(req.params.deviceId);
    res.json({ deleted: true });
  });

  return router;
}
