import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import DeviceCard from '../components/DeviceCard';

const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  title: { fontSize: '24px', fontWeight: '600' },
  stats: { display: 'flex', gap: '16px' },
  stat: {
    padding: '8px 16px',
    background: '#161b22',
    borderRadius: '8px',
    border: '1px solid #21262d',
    fontSize: '13px',
  },
  statValue: { fontWeight: '700', color: '#26A69A' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' },
  empty: { textAlign: 'center', color: '#8b949e', padding: '64px 0', fontSize: '15px' },
};

export default function Dashboard() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.getDevices();
        setDevices(data.data || []);
      } catch { /* fleet server may not be running */ }
      setLoading(false);
    };
    load();
    const timer = setInterval(load, 10000);
    return () => clearInterval(timer);
  }, []);

  const online = devices.filter(d => d.status === 'online').length;

  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.title}>Devices</h1>
        <div style={styles.stats}>
          <div style={styles.stat}>Total: <span style={styles.statValue}>{devices.length}</span></div>
          <div style={styles.stat}>Online: <span style={{ ...styles.statValue, color: '#3fb950' }}>{online}</span></div>
          <div style={styles.stat}>Offline: <span style={{ ...styles.statValue, color: '#f85149' }}>{devices.length - online}</span></div>
        </div>
      </div>
      {loading ? (
        <div style={styles.empty}>Loading...</div>
      ) : devices.length === 0 ? (
        <div style={styles.empty}>
          No devices registered yet.<br />
          Start a Fleet Agent to see it appear here.
        </div>
      ) : (
        <div style={styles.grid}>
          {devices.map(d => (
            <Link key={d.device_id} to={`/device/${d.device_id}`} style={{ textDecoration: 'none' }}>
              <DeviceCard device={d} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
