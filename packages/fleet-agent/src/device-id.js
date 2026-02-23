import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ID_FILE = join(__dirname, '..', 'data', 'device-id.json');

export function getOrCreateDeviceId() {
  const dir = dirname(ID_FILE);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  if (existsSync(ID_FILE)) {
    try {
      const data = JSON.parse(readFileSync(ID_FILE, 'utf-8'));
      if (data.deviceId) return data;
    } catch { /* regenerate */ }
  }

  const data = {
    deviceId: `clawbox-${uuidv4().slice(0, 8)}`,
    name: `ClawBox-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
    createdAt: new Date().toISOString(),
  };
  writeFileSync(ID_FILE, JSON.stringify(data, null, 2));
  return data;
}

export function bindDevice(customId, customName) {
  const dir = dirname(ID_FILE);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  const data = {
    deviceId: customId || `clawbox-${uuidv4().slice(0, 8)}`,
    name: customName || `ClawBox-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
    createdAt: new Date().toISOString(),
  };
  writeFileSync(ID_FILE, JSON.stringify(data, null, 2));
  return data;
}
