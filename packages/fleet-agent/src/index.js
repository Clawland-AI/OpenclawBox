import { getOrCreateDeviceId } from './device-id.js';
import { createHeartbeatLoop } from './heartbeat.js';
import { createConfigPoller } from './config-poll.js';
import { createOtaHandler } from './ota.js';

const config = {
  fleetServerUrl: process.env.FLEET_SERVER_URL || 'http://localhost:4100',
  heartbeatIntervalMs: parseInt(process.env.HEARTBEAT_INTERVAL || '30000', 10),
  configPollIntervalMs: parseInt(process.env.CONFIG_POLL_INTERVAL || '60000', 10),
};

const deviceInfo = getOrCreateDeviceId();
console.log(`[Fleet Agent] Device: ${deviceInfo.deviceId} (${deviceInfo.name})`);

const heartbeat = createHeartbeatLoop(deviceInfo, config);
const configPoller = createConfigPoller(deviceInfo.deviceId, config);
const otaHandler = createOtaHandler(deviceInfo.deviceId, config);

heartbeat.start((response) => {
  if (response?.pendingOta) {
    otaHandler.handleOta(response.pendingOta);
  }
});

configPoller.start((newConfig) => {
  console.log('[Agent] Applying new configuration (hot-reload)');
});

process.on('SIGINT', () => {
  console.log('\n[Fleet Agent] Shutting down...');
  heartbeat.stop();
  configPoller.stop();
  process.exit(0);
});

console.log('[Fleet Agent] Running. Press Ctrl+C to stop.');
