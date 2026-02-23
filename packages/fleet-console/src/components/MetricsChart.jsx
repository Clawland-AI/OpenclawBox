import React from 'react';

export default function MetricsChart({ data }) {
  if (!data || data.length === 0) return null;

  const maxRequests = Math.max(...data.map(d => d.requests || 0), 1);
  const barWidth = Math.max(100 / data.length - 1, 2);

  return (
    <div style={{ background: '#161b22', borderRadius: '12px', border: '1px solid #21262d', padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '120px' }}>
        {data.map((d, i) => {
          const height = Math.max(((d.requests || 0) / maxRequests) * 100, 2);
          return (
            <div
              key={i}
              title={`${d.hour}\n${d.requests} requests\n${(d.tokens || 0).toLocaleString()} tokens\n$${(d.cost_usd || 0).toFixed(4)}`}
              style={{
                flex: 1,
                height: `${height}%`,
                background: 'linear-gradient(180deg, #26A69A 0%, #1a7a6f 100%)',
                borderRadius: '3px 3px 0 0',
                minWidth: '4px',
                transition: 'height 0.3s',
              }}
            />
          );
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '11px', color: '#8b949e' }}>
        <span>{data[0]?.hour?.slice(11) || ''}</span>
        <span>{data[data.length - 1]?.hour?.slice(11) || ''}</span>
      </div>
    </div>
  );
}
