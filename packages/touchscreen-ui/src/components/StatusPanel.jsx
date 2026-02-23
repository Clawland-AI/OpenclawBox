import React from 'react';

const panel = {
  width: 260,
  height: 400,
  padding: '24px 20px',
  borderRight: '1px solid #21262d',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const logo = {
  fontSize: '22px',
  fontWeight: 800,
  letterSpacing: '-0.5px',
  marginBottom: '4px',
};

const dot = (color) => ({
  display: 'inline-block',
  width: 10,
  height: 10,
  borderRadius: '50%',
  background: color,
  marginRight: 8,
  boxShadow: `0 0 6px ${color}`,
});

const statusColor = { online: '#3fb950', degraded: '#d29922', offline: '#f85149' };

function formatUptime(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function StatusPanel({ health, uptime, time }) {
  const color = statusColor[health] || '#484f58';
  const label = health || 'connecting...';

  return (
    <div style={panel}>
      <div>
        <div style={logo}>
          <span style={{ color: '#E53935' }}>Claw</span>
          <span style={{ color: '#26A69A' }}>Box</span>
        </div>
        <div style={{ fontSize: '11px', color: '#8b949e', marginBottom: '24px' }}>
          Personal AI Appliance
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '11px', color: '#8b949e', marginBottom: '4px' }}>STATUS</div>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px', fontWeight: 600 }}>
            <span style={dot(color)} />
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '11px', color: '#8b949e', marginBottom: '4px' }}>UPTIME</div>
          <div style={{ fontSize: '22px', fontWeight: 700, fontFamily: 'monospace' }}>
            {formatUptime(uptime)}
          </div>
        </div>
      </div>

      <div style={{ fontSize: '12px', color: '#8b949e', fontFamily: 'monospace' }}>
        {time.toLocaleTimeString()}
      </div>
    </div>
  );
}
