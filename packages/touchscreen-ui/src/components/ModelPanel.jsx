import React from 'react';

const panel = {
  width: 300,
  height: 400,
  padding: '24px 20px',
  borderRight: '1px solid #21262d',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const profileColors = {
  eco: '#3fb950',
  auto: '#58a6ff',
  premium: '#d2a8ff',
  free: '#8b949e',
};

export default function ModelPanel({ model }) {
  const profColor = profileColors[model.profile] || '#58a6ff';

  return (
    <div style={panel}>
      <div>
        <div style={{ fontSize: '11px', color: '#8b949e', marginBottom: '4px' }}>ACTIVE MODEL</div>
        <div style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'monospace', wordBreak: 'break-all' }}>
          {model.active}
        </div>
      </div>

      <div>
        <div style={{ fontSize: '11px', color: '#8b949e', marginBottom: '4px' }}>ROUTING PROFILE</div>
        <div style={{
          display: 'inline-block',
          padding: '4px 12px',
          borderRadius: '6px',
          background: profColor + '18',
          border: `1px solid ${profColor}44`,
          color: profColor,
          fontSize: '14px',
          fontWeight: 600,
          textTransform: 'uppercase',
        }}>
          {model.profile}
        </div>
      </div>

      <div>
        <div style={{ fontSize: '11px', color: '#8b949e', marginBottom: '4px' }}>PROVIDER</div>
        <div style={{ fontSize: '14px' }}>{model.provider || '--'}</div>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <div style={{ fontSize: '11px', color: '#8b949e', marginBottom: '6px' }}>ROUTING PATH</div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '12px',
          fontFamily: 'monospace',
          color: '#8b949e',
        }}>
          <span style={{ color: '#58a6ff' }}>req</span>
          <span>→</span>
          <span style={{ color: '#26A69A' }}>CheapRouter</span>
          <span>→</span>
          <span style={{ color: '#d2a8ff' }}>ClawRouter</span>
          <span>→</span>
          <span style={{ color: '#3fb950' }}>model</span>
        </div>
      </div>
    </div>
  );
}
