import React from 'react';

const panel = {
  width: 320,
  height: 400,
  padding: '24px 20px',
  borderRight: '1px solid #21262d',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const metricBox = {
  padding: '14px 16px',
  borderRadius: '10px',
  background: '#161b22',
  border: '1px solid #21262d',
};

const metricLabel = { fontSize: '11px', color: '#8b949e', marginBottom: '2px' };
const metricValue = { fontSize: '24px', fontWeight: 700, fontFamily: 'monospace' };

function formatCost(c) {
  return c < 0.01 ? `$${c.toFixed(4)}` : `$${c.toFixed(2)}`;
}

function formatTokens(t) {
  if (t >= 1_000_000) return `${(t / 1_000_000).toFixed(1)}M`;
  if (t >= 1_000) return `${(t / 1_000).toFixed(1)}K`;
  return String(t);
}

export default function MetricsPanel({ metrics }) {
  return (
    <div style={panel}>
      <div style={{ fontSize: '11px', color: '#8b949e', marginBottom: '4px' }}>TODAY'S METRICS</div>

      <div style={metricBox}>
        <div style={metricLabel}>REQUESTS</div>
        <div style={{ ...metricValue, color: '#58a6ff' }}>
          {metrics.requests.toLocaleString()}
        </div>
      </div>

      <div style={metricBox}>
        <div style={metricLabel}>COST</div>
        <div style={{ ...metricValue, color: '#3fb950' }}>
          {formatCost(metrics.costToday)}
        </div>
      </div>

      <div style={metricBox}>
        <div style={metricLabel}>TOKENS</div>
        <div style={{ ...metricValue, color: '#d2a8ff' }}>
          {formatTokens(metrics.tokensToday)}
        </div>
      </div>

      <div style={metricBox}>
        <div style={metricLabel}>AVG LATENCY</div>
        <div style={{ ...metricValue, color: '#d29922' }}>
          {metrics.avgLatency}<span style={{ fontSize: '14px', fontWeight: 400 }}>ms</span>
        </div>
      </div>
    </div>
  );
}
