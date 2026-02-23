import { Router } from 'express';

export function createConfigRoutes(db) {
  const router = Router();

  router.get('/config/:deviceId', (req, res) => {
    const row = db.prepare('SELECT config_json FROM devices WHERE device_id = ?').get(req.params.deviceId);
    if (!row) return res.status(404).json({ error: 'Device not found' });
    try {
      res.json(JSON.parse(row.config_json || '{}'));
    } catch {
      res.json({});
    }
  });

  router.put('/config/:deviceId', (req, res) => {
    const { deviceId } = req.params;
    const configJson = JSON.stringify(req.body);
    const result = db.prepare(
      'UPDATE devices SET config_json = ?, updated_at = datetime(\'now\') WHERE device_id = ?'
    ).run(configJson, deviceId);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Device not found' });
    }
    res.json({ updated: true, deviceId });
  });

  return router;
}
