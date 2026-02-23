export function createConfigPoller(deviceId, config) {
  const fleetUrl = config.fleetServerUrl || 'http://localhost:4100';
  const intervalMs = config.configPollIntervalMs || 60000;
  let currentConfig = {};
  let timer = null;

  async function poll() {
    try {
      const res = await fetch(`${fleetUrl}/api/config/${deviceId}`);
      if (res.ok) {
        const newConfig = await res.json();
        const changed = JSON.stringify(newConfig) !== JSON.stringify(currentConfig);
        if (changed) {
          console.log('[ConfigPoll] Configuration updated:', JSON.stringify(newConfig));
          currentConfig = newConfig;
          return { changed: true, config: newConfig };
        }
      }
    } catch (err) {
      console.error(`[ConfigPoll] Failed: ${err.message}`);
    }
    return { changed: false, config: currentConfig };
  }

  function start(onConfigChange) {
    console.log(`[ConfigPoll] Polling every ${intervalMs / 1000}s`);
    const tick = async () => {
      const result = await poll();
      if (result.changed && onConfigChange) {
        onConfigChange(result.config);
      }
    };
    tick();
    timer = setInterval(tick, intervalMs);
  }

  function stop() {
    if (timer) clearInterval(timer);
  }

  return { start, stop, poll, getCurrentConfig: () => currentConfig };
}
