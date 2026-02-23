import React, { useEffect, useState } from 'react';
import { api } from '../api';
import MetricsChart from '../components/MetricsChart';

const styles = {
  title: { fontSize: '24px', fontWeight: '600', marginBottom: '24px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' },
  statCard: {
    background: '#161b22',
    borderRadius: '12px',
    border: '1px solid #21262d',
    padding: '20px',
    textAlign: 'center',
  },
  statLabel: { color: '#8b949e', fontSize: '13px', marginBottom: '8px' },
  statValue: { fontSize: '28px', fontWeight: '700', color: '#26A69A' },
  section: { marginBottom: '32px' },
  sectionTitle: { fontSize: '18px', fontWeight: '600', marginBottom: '16px' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '10px 16px', borderBottom: '2px solid #21262d', color: '#8b949e', fontSize: '13px' },
  td: { padding: '10px 16px', borderBottom: '1px solid #21262d', fontSize: '14px' },
};

export default function Metrics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      try { setData(await api.getMetrics()); } catch { /* fleet server offline */ }
    };
    load();
    const timer = setInterval(load, 15000);
    return () => clearInterval(timer);
  }, []);

  if (!data) return <div style={{ textAlign: 'center', color: '#8b949e', padding: '64px' }}>Loading metrics... (Fleet Server must be running)</div>;

  const s = data.summary || {};

  return (
    <div>
      <h1 style={styles.title}>Metrics (Last 24h)</h1>
      <div style={styles.grid}>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Total Requests</div>
          <div style={styles.statValue}>{(s.total_requests || 0).toLocaleString()}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Total Tokens</div>
          <div style={styles.statValue}>{(s.total_tokens || 0).toLocaleString()}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Total Cost</div>
          <div style={{ ...styles.statValue, color: '#E53935' }}>${(s.total_cost_usd || 0).toFixed(4)}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Avg Latency</div>
          <div style={styles.statValue}>{Math.round(s.avg_latency_ms || 0)}ms</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Active Devices</div>
          <div style={styles.statValue}>{s.active_devices || 0}</div>
        </div>
      </div>

      {data.hourly?.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Hourly Activity</h2>
          <MetricsChart data={data.hourly} />
        </div>
      )}

      {data.byModel?.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>By Model</h2>
          <table style={styles.table}>
            <thead><tr><th style={styles.th}>Model</th><th style={styles.th}>Requests</th><th style={styles.th}>Tokens</th><th style={styles.th}>Cost</th></tr></thead>
            <tbody>
              {data.byModel.map(m => (
                <tr key={m.model}><td style={styles.td}>{m.model}</td><td style={styles.td}>{m.requests}</td><td style={styles.td}>{(m.tokens || 0).toLocaleString()}</td><td style={styles.td}>${(m.cost_usd || 0).toFixed(4)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data.byDevice?.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>By Device</h2>
          <table style={styles.table}>
            <thead><tr><th style={styles.th}>Device</th><th style={styles.th}>Requests</th><th style={styles.th}>Tokens</th><th style={styles.th}>Cost</th></tr></thead>
            <tbody>
              {data.byDevice.map(d => (
                <tr key={d.device_id}><td style={styles.td}>{d.device_id}</td><td style={styles.td}>{d.requests}</td><td style={styles.td}>{(d.tokens || 0).toLocaleString()}</td><td style={styles.td}>${(d.cost_usd || 0).toFixed(4)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
