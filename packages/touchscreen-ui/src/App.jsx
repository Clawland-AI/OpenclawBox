import React, { useState, useEffect, useCallback } from 'react';
import StatusPanel from './components/StatusPanel';
import MetricsPanel from './components/MetricsPanel';
import QRPanel from './components/QRPanel';
import ModelPanel from './components/ModelPanel';

const ROUTER_URL = 'http://localhost:4000';
const FLEET_URL = 'http://localhost:5000';
const POLL_MS = 3000;

const layout = {
  display: 'flex',
  width: 1280,
  height: 400,
  background: '#0d1117',
  overflow: 'hidden',
};

export default function App() {
  const [health, setHealth] = useState(null);
  const [uptime, setUptime] = useState(0);
  const [metrics, setMetrics] = useState({
    requests: 0,
    costToday: 0,
    tokensToday: 0,
    avgLatency: 0,
  });
  const [model, setModel] = useState({
    active: 'blockrun/auto',
    profile: 'auto',
    provider: '--',
  });
  const [devices, setDevices] = useState([]);
  const [time, setTime] = useState(new Date());

  const poll = useCallback(async () => {
    try {
      const res = await fetch(`${ROUTER_URL}/health`);
      if (res.ok) {
        const data = await res.json();
        setHealth('online');
        setUptime((prev) => prev + POLL_MS / 1000);
        if (data.model) setModel((m) => ({ ...m, active: data.model }));
      } else {
        setHealth('degraded');
      }
    } catch {
      setHealth('offline');
    }

    try {
      const res = await fetch(`${FLEET_URL}/api/devices`);
      if (res.ok) setDevices(await res.json());
    } catch {}

    setMetrics((prev) => ({
      requests: prev.requests + Math.floor(Math.random() * 3),
      costToday: +(prev.costToday + Math.random() * 0.002).toFixed(4),
      tokensToday: prev.tokensToday + Math.floor(Math.random() * 150),
      avgLatency: Math.floor(200 + Math.random() * 100),
    }));
  }, []);

  useEffect(() => {
    poll();
    const id = setInterval(poll, POLL_MS);
    return () => clearInterval(id);
  }, [poll]);

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const hostname = typeof window !== 'undefined' ? window.location.hostname : 'clawbox.local';

  return (
    <div style={layout}>
      <StatusPanel health={health} uptime={uptime} time={time} />
      <ModelPanel model={model} />
      <MetricsPanel metrics={metrics} />
      <QRPanel hostname={hostname} devices={devices} />
    </div>
  );
}
