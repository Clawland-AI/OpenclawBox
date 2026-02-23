export function createDeviceRateLimiter(config) {
  const limits = config.rateLimit?.perDevice || { rpm: 60, tokensPerMinute: 100000 };
  const enabled = config.rateLimit?.enabled !== false;
  const windows = new Map();

  function getWindow(deviceId) {
    const now = Date.now();
    let win = windows.get(deviceId);
    if (!win || now - win.start > 60000) {
      win = { start: now, requests: 0, tokens: 0 };
      windows.set(deviceId, win);
    }
    return win;
  }

  function check(deviceId) {
    if (!enabled) return { allowed: true };
    const win = getWindow(deviceId);
    if (win.requests >= limits.rpm) {
      return { allowed: false, retryAfterMs: 60000 - (Date.now() - win.start), reason: 'rpm' };
    }
    if (win.tokens >= limits.tokensPerMinute) {
      return { allowed: false, retryAfterMs: 60000 - (Date.now() - win.start), reason: 'tokens' };
    }
    win.requests++;
    return { allowed: true };
  }

  function record(deviceId, tokens) {
    if (!enabled) return;
    const win = getWindow(deviceId);
    win.tokens += tokens;
  }

  setInterval(() => {
    const now = Date.now();
    for (const [id, win] of windows) {
      if (now - win.start > 120000) windows.delete(id);
    }
  }, 60000);

  return { check, record };
}
