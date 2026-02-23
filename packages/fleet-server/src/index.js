import express from 'express';
import cors from 'cors';
import { initDatabase } from './db.js';
import { createHeartbeatRoutes } from './routes/heartbeat.js';
import { createDeviceRoutes } from './routes/devices.js';
import { createConfigRoutes } from './routes/config.js';
import { createOtaRoutes } from './routes/ota.js';
import { createMetricsRoutes } from './routes/metrics.js';

const PORT = parseInt(process.env.FLEET_PORT || '4100', 10);
const DB_PATH = process.env.FLEET_DB_PATH || undefined;

const db = initDatabase(DB_PATH);
const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'fleet-server', version: '0.1.0' });
});

app.use('/api', createHeartbeatRoutes(db));
app.use('/api', createDeviceRoutes(db));
app.use('/api', createConfigRoutes(db));
app.use('/api', createOtaRoutes(db));
app.use('/api', createMetricsRoutes(db));

app.listen(PORT, () => {
  console.log(`[Fleet Server] running on port ${PORT}`);
});

export { app };
