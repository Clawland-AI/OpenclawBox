export function createMetricsBridge(config) {
  const fleetUrl = config.fleetServerUrl;
  const buffer = [];
  let flushTimer = null;

  async function flush() {
    if (buffer.length === 0) return;
    const batch = buffer.splice(0, buffer.length);
    try {
      await fetch(`${fleetUrl}/api/metrics/ingest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ metrics: batch }),
      });
    } catch {
      // Fleet server may not be running; silently drop
    }
  }

  function report(metric) {
    buffer.push({ ...metric, timestamp: new Date().toISOString() });
    if (!flushTimer) {
      flushTimer = setTimeout(() => {
        flushTimer = null;
        flush();
      }, 5000);
    }
  }

  return { report, flush };
}
