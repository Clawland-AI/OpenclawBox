import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';

const styles = {
  back: { color: '#58a6ff', textDecoration: 'none', fontSize: '14px', marginBottom: '16px', display: 'inline-block' },
  card: { background: '#161b22', borderRadius: '12px', border: '1px solid #21262d', padding: '24px', marginBottom: '24px' },
  title: { fontSize: '22px', fontWeight: '600', marginBottom: '16px' },
  row: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #21262d' },
  label: { color: '#8b949e', fontSize: '14px' },
  value: { fontWeight: '500', fontSize: '14px' },
  actions: { display: 'flex', gap: '12px', marginTop: '24px' },
  btn: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
  },
  btnPrimary: { background: '#26A69A', color: '#fff' },
  btnDanger: { background: '#E53935', color: '#fff' },
  input: {
    background: '#0d1117',
    border: '1px solid #21262d',
    borderRadius: '6px',
    padding: '8px 12px',
    color: '#e6edf3',
    fontSize: '14px',
    width: '200px',
  },
};

export default function DeviceDetail() {
  const { id } = useParams();
  const [device, setDevice] = useState(null);
  const [otaVersion, setOtaVersion] = useState('0.2.0');
  const [configInput, setConfigInput] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.getDevice(id).then(setDevice).catch(() => {});
    api.getConfig(id).then(c => setConfigInput(JSON.stringify(c, null, 2))).catch(() => {});
  }, [id]);

  const triggerOta = async () => {
    try {
      await api.triggerOta(id, otaVersion);
      setMessage(`OTA triggered for v${otaVersion}`);
    } catch (e) { setMessage(`Error: ${e.message}`); }
  };

  const pushConfig = async () => {
    try {
      const config = JSON.parse(configInput);
      await api.updateConfig(id, config);
      setMessage('Config updated');
    } catch (e) { setMessage(`Error: ${e.message}`); }
  };

  if (!device) return <div>Loading...</div>;

  return (
    <div>
      <Link to="/" style={styles.back}>← Back to Devices</Link>
      <div style={styles.card}>
        <h2 style={styles.title}>{device.name || device.device_id}</h2>
        <div style={styles.row}><span style={styles.label}>Device ID</span><span style={styles.value}>{device.device_id}</span></div>
        <div style={styles.row}><span style={styles.label}>Status</span><span style={{ ...styles.value, color: device.status === 'online' ? '#3fb950' : '#f85149' }}>{device.status}</span></div>
        <div style={styles.row}><span style={styles.label}>Version</span><span style={styles.value}>{device.version}</span></div>
        <div style={styles.row}><span style={styles.label}>Last Heartbeat</span><span style={styles.value}>{device.last_heartbeat || 'N/A'}</span></div>
        <div style={styles.row}><span style={styles.label}>IP Address</span><span style={styles.value}>{device.ip_address || 'N/A'}</span></div>
        {device.last_error && (
          <div style={styles.row}><span style={styles.label}>Last Error</span><span style={{ ...styles.value, color: '#f85149' }}>{device.last_error}</span></div>
        )}
      </div>

      <div style={styles.card}>
        <h3 style={{ marginBottom: '16px' }}>OTA Update</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input style={styles.input} value={otaVersion} onChange={e => setOtaVersion(e.target.value)} placeholder="Target version" />
          <button style={{ ...styles.btn, ...styles.btnPrimary }} onClick={triggerOta}>Trigger OTA</button>
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={{ marginBottom: '16px' }}>Device Configuration</h3>
        <textarea
          style={{ ...styles.input, width: '100%', height: '120px', fontFamily: 'monospace', resize: 'vertical' }}
          value={configInput}
          onChange={e => setConfigInput(e.target.value)}
        />
        <div style={styles.actions}>
          <button style={{ ...styles.btn, ...styles.btnPrimary }} onClick={pushConfig}>Push Config</button>
        </div>
      </div>

      {message && <div style={{ marginTop: '16px', padding: '12px', background: '#161b22', borderRadius: '8px', border: '1px solid #21262d' }}>{message}</div>}
    </div>
  );
}
