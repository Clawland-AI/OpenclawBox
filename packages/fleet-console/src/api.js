const BASE = '/api';

async function fetchJSON(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const api = {
  getDevices: () => fetchJSON('/devices'),
  getDevice: (id) => fetchJSON(`/devices/${id}`),
  getMetrics: () => fetchJSON('/metrics'),
  getConfig: (id) => fetchJSON(`/config/${id}`),
  updateConfig: (id, config) =>
    fetchJSON(`/config/${id}`, { method: 'PUT', body: JSON.stringify(config) }),
  triggerOta: (deviceId, targetVersion) =>
    fetchJSON('/ota/trigger', { method: 'POST', body: JSON.stringify({ deviceId, targetVersion }) }),
  getOtaStatus: (deviceId) => fetchJSON(`/ota/status?deviceId=${deviceId || ''}`),
};
