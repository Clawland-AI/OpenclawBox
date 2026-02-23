import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DeviceDetail from './pages/DeviceDetail';
import Metrics from './pages/Metrics';

const styles = {
  app: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    background: '#0d1117',
    color: '#e6edf3',
    minHeight: '100vh',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    padding: '16px 32px',
    borderBottom: '1px solid #21262d',
    background: '#161b22',
  },
  logo: { display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' },
  logoText: { fontSize: '20px', fontWeight: '700', color: '#e6edf3' },
  logoRed: { color: '#E53935' },
  logoTeal: { color: '#26A69A' },
  link: {
    color: '#8b949e',
    textDecoration: 'none',
    fontSize: '14px',
    padding: '6px 12px',
    borderRadius: '6px',
    transition: 'all 0.2s',
  },
  activeLink: {
    color: '#e6edf3',
    background: '#21262d',
  },
  main: { padding: '32px', maxWidth: '1200px', margin: '0 auto' },
};

export default function App() {
  return (
    <div style={styles.app}>
      <nav style={styles.nav}>
        <a href="/" style={styles.logo}>
          <span style={styles.logoText}>
            <span style={styles.logoRed}>Claw</span>
            <span style={styles.logoTeal}>Box</span>
          </span>
          <span style={{ fontSize: '12px', color: '#8b949e' }}>Fleet Console</span>
        </a>
        <NavLink to="/" end style={({ isActive }) => ({ ...styles.link, ...(isActive ? styles.activeLink : {}) })}>
          Devices
        </NavLink>
        <NavLink to="/metrics" style={({ isActive }) => ({ ...styles.link, ...(isActive ? styles.activeLink : {}) })}>
          Metrics
        </NavLink>
      </nav>
      <main style={styles.main}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/device/:id" element={<DeviceDetail />} />
          <Route path="/metrics" element={<Metrics />} />
        </Routes>
      </main>
    </div>
  );
}
