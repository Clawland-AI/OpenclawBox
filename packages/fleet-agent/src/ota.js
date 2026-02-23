export function createOtaHandler(deviceId, config) {
  const fleetUrl = config.fleetServerUrl || 'http://localhost:4100';

  async function handleOta(otaInfo) {
    if (!otaInfo?.targetVersion) return;
    console.log(`[OTA] Update requested: → v${otaInfo.targetVersion}`);

    try {
      console.log(`[OTA] Simulating update to v${otaInfo.targetVersion}...`);
      console.log('[OTA] Step 1/3: Downloading new version...');
      await new Promise(r => setTimeout(r, 1000));
      console.log('[OTA] Step 2/3: Applying update...');
      await new Promise(r => setTimeout(r, 1000));
      console.log('[OTA] Step 3/3: Verifying...');
      await new Promise(r => setTimeout(r, 500));

      await fetch(`${fleetUrl}/api/ota/ack`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId: otaInfo.jobId, status: 'completed' }),
      });
      console.log(`[OTA] Update to v${otaInfo.targetVersion} completed successfully`);
    } catch (err) {
      console.error(`[OTA] Update failed: ${err.message}`);
      try {
        await fetch(`${fleetUrl}/api/ota/ack`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jobId: otaInfo.jobId, status: 'failed' }),
        });
      } catch { /* best effort */ }
    }
  }

  return { handleOta };
}
