import React from 'react';

const styles = {
  card: {
    background: '#161b22',
    borderRadius: '12px',
    border: '1px solid #21262d',
    padding: '20px',
    transition: 'border-color 0.2s, transform 0.2s',
    cursor: 'pointer',
  },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
  name: { fontSize: '16px', fontWeight: '600', color: '#e6edf3' },
  status: {
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
  },
  online: { background: '#0d3320', color: '#3fb950' },
  offline: { background: '#3d1419', color: '#f85149' },
  info: { fontSize: '13px', color: '#8b949e', marginBottom: '4px' },
};

export default function DeviceCard({ device }) {
  const isOnline = device.status === 'online';
  const heartbeatAge = device.last_heartbeat
    ? `${Math.round((Date.now() - new Date(device.last_heartbeat + 'Z').getTime()) / 1000)}s ago`
    : 'never';

  return (
    <div style={styles.card} onMouseOver={e => e.currentTarget.style.borderColor = '#26A69A'} onMouseOut={e => e.currentTarget.style.borderColor = '#21262d'}>
      <div style={styles.header}>
        <span style={styles.name}>{device.name || device.device_id}</span>
        <span style={{ ...styles.status, ...(isOnline ? styles.online : styles.offline) }}>
          {isOnline ? 'Online' : 'Offline'}
        </span>
      </div>
      <div style={styles.info}>ID: {device.device_id}</div>
      <div style={styles.info}>Version: {device.version || 'unknown'}</div>
      <div style={styles.info}>Last heartbeat: {heartbeatAge}</div>
      {device.last_error && <div style={{ ...styles.info, color: '#f85149' }}>Error: {device.last_error}</div>}
    </div>
  );
}
