import React from 'react';

const panel = {
  width: 400,
  height: 400,
  padding: '24px 20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
};

function QRPlaceholder({ url }) {
  const size = 140;
  const cells = 11;
  const cellSize = size / cells;

  const grid = Array.from({ length: cells }, (_, r) =>
    Array.from({ length: cells }, (_, c) => {
      if (r < 3 && c < 3) return true;
      if (r < 3 && c >= cells - 3) return true;
      if (r >= cells - 3 && c < 3) return true;
      return (r + c) % 3 === 0 || (r * c) % 7 === 0;
    }),
  );

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill="#fff" rx="4" />
      {grid.map((row, r) =>
        row.map((filled, c) =>
          filled ? (
            <rect
              key={`${r}-${c}`}
              x={c * cellSize}
              y={r * cellSize}
              width={cellSize}
              height={cellSize}
              fill="#0d1117"
            />
          ) : null,
        ),
      )}
    </svg>
  );
}

export default function QRPanel({ hostname, devices }) {
  const pairUrl = `http://${hostname}:4000`;

  return (
    <div style={panel}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '11px', color: '#8b949e', marginBottom: '8px' }}>SCAN TO PAIR</div>
        <QRPlaceholder url={pairUrl} />
        <div style={{ fontSize: '11px', color: '#8b949e', marginTop: '6px', fontFamily: 'monospace' }}>
          {pairUrl}
        </div>
      </div>

      <div style={{ width: '100%' }}>
        <div style={{ fontSize: '11px', color: '#8b949e', marginBottom: '6px' }}>
          CONNECTED DEVICES ({devices.length})
        </div>
        <div style={{
          maxHeight: '120px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}>
          {devices.length === 0 ? (
            <div style={{ fontSize: '12px', color: '#484f58', fontStyle: 'italic' }}>
              No devices connected yet
            </div>
          ) : (
            devices.slice(0, 5).map((d, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '6px 10px',
                borderRadius: '6px',
                background: '#161b22',
                fontSize: '12px',
              }}>
                <span style={{ fontFamily: 'monospace' }}>
                  {d.deviceId?.slice(0, 8) || d.id?.slice(0, 8) || `dev-${i}`}
                </span>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: d.status === 'online' ? '#3fb950' : '#484f58',
                }} />
              </div>
            ))
          )}
          {devices.length > 5 && (
            <div style={{ fontSize: '11px', color: '#484f58', textAlign: 'center' }}>
              +{devices.length - 5} more
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
