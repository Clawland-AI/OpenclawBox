const VERSION = '0.1.0';

export function createHeartbeatLoop(deviceInfo, config) {
  const fleetUrl = config.fleetServerUrl || 'http://localhost:4100';
  const intervalMs = config.heartbeatIntervalMs || 30000;
  let lastError = null;
  let timer = null;

  async function sendHeartbeat() {
    try {
      const res = await fetch(`${fleetUrl}/api/heartbeat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deviceId: deviceInfo.deviceId,
          name: deviceInfo.name,
          version: VERSION,
          lastError,
        }),
      });
      const data = await res.json();
      lastError = null;
      return data;
    } catch (err) {
      lastError = err.message;
      console.error(`[Heartbeat] Failed: ${err.message}`);
      return null;
    }
  }

  function start(onResponse) {
    console.log(`[Heartbeat] Starting (every ${intervalMs / 1000}s) → ${fleetUrl}`);
    const tick = async () => {
      const resp = await sendHeartbeat();
      if (resp && onResponse) onResponse(resp);
    };
    tick();
    timer = setInterval(tick, intervalMs);
  }

  function stop() {
    if (timer) clearInterval(timer);
  }

  return { start, stop, sendHeartbeat };
}
