export function createConfigBridge(config) {
  const fleetUrl = config.fleetServerUrl;
  const cache = new Map();
  const CACHE_TTL = 30000;

  async function getProfile(deviceId) {
    const cached = cache.get(deviceId);
    if (cached && Date.now() - cached.fetchedAt < CACHE_TTL) {
      return cached.profile;
    }
    try {
      const res = await fetch(`${fleetUrl}/api/config/${deviceId}`);
      if (res.ok) {
        const profile = await res.json();
        cache.set(deviceId, { profile, fetchedAt: Date.now() });
        return profile;
      }
    } catch {
      // Fleet server unavailable; use defaults
    }
    return null;
  }

  return { getProfile };
}
