import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

const s = {
  hero: {
    textAlign: 'center',
    padding: '5rem 1rem 3rem',
    background: 'linear-gradient(180deg, var(--ifm-background-color) 0%, #0d1117 100%)',
  },
  badge: {
    display: 'inline-block',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
    background: '#E53935',
    color: '#fff',
    marginBottom: '1.5rem',
    letterSpacing: '0.5px',
  },
  title: {
    fontSize: '3rem',
    fontWeight: '800',
    lineHeight: '1.15',
    marginBottom: '1rem',
    maxWidth: '700px',
    margin: '0 auto 1rem',
  },
  red: { color: '#E53935' },
  teal: { color: '#26A69A' },
  subtitle: {
    fontSize: '1.2rem',
    color: 'var(--ifm-color-emphasis-700)',
    maxWidth: '600px',
    margin: '0 auto 2.5rem',
    lineHeight: '1.6',
  },
  form: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: '500px',
    margin: '0 auto 1rem',
  },
  input: {
    flex: 1,
    minWidth: '240px',
    padding: '14px 18px',
    borderRadius: '8px',
    border: '2px solid var(--ifm-color-emphasis-300)',
    fontSize: '16px',
    background: 'var(--ifm-background-color)',
    color: 'var(--ifm-font-color-base)',
    outline: 'none',
  },
  btn: {
    padding: '14px 28px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    background: '#E53935',
    color: '#fff',
    transition: 'transform 0.1s',
  },
  note: {
    fontSize: '13px',
    color: 'var(--ifm-color-emphasis-600)',
    marginTop: '0.5rem',
  },
  section: {
    padding: '4rem 1rem',
    maxWidth: '960px',
    margin: '0 auto',
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  grid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '24px',
  },
  card: {
    background: 'var(--ifm-card-background-color)',
    borderRadius: '12px',
    padding: '28px',
    border: '1px solid var(--ifm-color-emphasis-200)',
  },
  cardTitle: { fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' },
  cardText: { color: 'var(--ifm-color-emphasis-700)', lineHeight: '1.6' },
  specTable: { width: '100%', borderCollapse: 'collapse', margin: '0 auto' },
  specTh: {
    textAlign: 'left',
    padding: '12px 16px',
    borderBottom: '2px solid var(--ifm-color-emphasis-300)',
    fontSize: '14px',
    color: 'var(--ifm-color-emphasis-600)',
  },
  specTd: {
    padding: '12px 16px',
    borderBottom: '1px solid var(--ifm-color-emphasis-200)',
    fontSize: '15px',
  },
  tierRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    justifyContent: 'center',
    marginTop: '2rem',
  },
  tier: {
    background: 'var(--ifm-card-background-color)',
    border: '2px solid var(--ifm-color-emphasis-200)',
    borderRadius: '12px',
    padding: '24px',
    width: '200px',
    textAlign: 'center',
  },
  tierHighlight: {
    borderColor: '#26A69A',
  },
  tierPrice: { fontSize: '2rem', fontWeight: '800' },
  tierName: { fontSize: '1rem', fontWeight: '600', marginBottom: '8px' },
  tierDesc: { fontSize: '13px', color: 'var(--ifm-color-emphasis-600)' },
  cta: {
    textAlign: 'center',
    padding: '4rem 1rem',
    background: 'linear-gradient(180deg, transparent 0%, rgba(38,166,154,0.08) 100%)',
  },
  disclaimer: {
    textAlign: 'center',
    padding: '2rem 1rem',
    fontSize: '12px',
    color: 'var(--ifm-color-emphasis-500)',
    maxWidth: '700px',
    margin: '0 auto',
    lineHeight: '1.6',
  },
};

export default function Kickstarter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <Layout title="Kickstarter" description="ClawBox is coming to Kickstarter">
      {/* Hero */}
      <header style={s.hero}>
        <div style={s.badge}>COMING TO KICKSTARTER — JUNE 2026</div>
        <h1 style={s.title}>
          <span style={s.red}>Your AI.</span> <span style={s.teal}>Your Data.</span> Your Device.
        </h1>
        <p style={s.subtitle}>
          ClawBox is a plug-and-play personal AI appliance that routes across 38+ models,
          auto-recovers from failures, and saves up to 90% on inference costs.
        </p>

        {!submitted ? (
          <>
            <form onSubmit={handleSubmit} style={s.form}>
              <input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={s.input}
                required
              />
              <button type="submit" style={s.btn}>
                Notify Me
              </button>
            </form>
            <p style={s.note}>Get early bird pricing. No spam. Unsubscribe anytime.</p>
          </>
        ) : (
          <div style={{ ...s.card, maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '1.25rem', fontWeight: '700', color: '#26A69A' }}>
              You're on the list!
            </p>
            <p style={s.cardText}>
              We'll notify you when ClawBox launches on Kickstarter with exclusive early bird pricing.
            </p>
          </div>
        )}

        <div style={{ marginTop: '2rem' }}>
          <img src="/img/logo.png" alt="ClawBox" style={{ maxWidth: '280px' }} />
        </div>
      </header>

      {/* Value Props */}
      <section style={s.section}>
        <h2 style={s.sectionTitle}>Why ClawBox?</h2>
        <div style={s.grid3}>
          <div style={s.card}>
            <div style={s.cardTitle}>Up to 90% Cheaper*</div>
            <p style={s.cardText}>
              Smart routing sends simple queries to free models, reserves premium for complex tasks.
              Blended cost: ~$2.05/M tokens vs $25/M for a single premium model.
            </p>
          </div>
          <div style={s.card}>
            <div style={s.cardTitle}>Always Reliable</div>
            <p style={s.cardText}>
              Provider down? Rate limited? ClawBox automatically switches to the next model.
              Your apps never see an error.
            </p>
          </div>
          <div style={s.card}>
            <div style={s.cardTitle}>Fleet Managed</div>
            <p style={s.cardText}>
              Monitor all devices from a web dashboard. Push configs, trigger OTA updates,
              track usage and costs — per device.
            </p>
          </div>
        </div>
      </section>

      {/* Specs Preview */}
      <section style={{ ...s.section, paddingTop: '2rem' }}>
        <h2 style={s.sectionTitle}>Two Editions</h2>
        <table style={s.specTable}>
          <thead>
            <tr>
              <th style={s.specTh}>Spec</th>
              <th style={s.specTh}>Starter — $179*</th>
              <th style={s.specTh}>Pro — $269*</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['SoC', 'RK3588S (8-core, 6 TOPS NPU)', 'RK3588 (8-core, 6 TOPS NPU)'],
              ['RAM', '4GB LPDDR4x', '8GB LPDDR4x'],
              ['Storage', '32GB eMMC', '64GB eMMC + M.2 NVMe'],
              ['Display', '7.9" bar touchscreen', '7.9" bar touchscreen'],
              ['Network', 'WiFi 6 + 1x GbE', 'WiFi 6 + 2x GbE'],
              ['Enclosure', 'Matte black', 'Matte black + aluminum top'],
            ].map(([spec, starter, pro], i) => (
              <tr key={i}>
                <td style={{ ...s.specTd, fontWeight: '600' }}>{spec}</td>
                <td style={s.specTd}>{starter}</td>
                <td style={s.specTd}>{pro}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ ...s.note, textAlign: 'center', marginTop: '1rem' }}>
          *Early Bird Kickstarter pricing. Retail: Starter $249 / Pro $349.
        </p>
      </section>

      {/* Tiers Preview */}
      <section style={{ ...s.section, paddingTop: '2rem' }}>
        <h2 style={s.sectionTitle}>Reward Tiers</h2>
        <div style={s.tierRow}>
          {[
            { name: 'Digital Supporter', price: '$29', desc: 'Software key + backer wall' },
            { name: 'Starter (Early Bird)', price: '$179', desc: 'ClawBox Starter Edition', hl: true },
            { name: 'Pro (Early Bird)', price: '$269', desc: 'ClawBox Pro Edition', hl: true },
            { name: 'Developer Pack', price: '$349', desc: 'Pro + GPIO board + dev docs' },
            { name: 'Fleet Pack (3x)', price: '$499', desc: '3x Starter + Fleet license' },
          ].map((t, i) => (
            <div key={i} style={{ ...s.tier, ...(t.hl ? s.tierHighlight : {}) }}>
              <div style={s.tierName}>{t.name}</div>
              <div style={s.tierPrice}>{t.price}</div>
              <div style={s.tierDesc}>{t.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Open Source */}
      <section style={{ ...s.section, textAlign: 'center', paddingTop: '2rem' }}>
        <h2 style={s.sectionTitle}>100% Open Source</h2>
        <p style={{ ...s.subtitle, margin: '0 auto 2rem' }}>
          The entire software stack is open-source (Apache-2.0). Try it today on any machine —
          the ClawBox hardware adds a purpose-built form factor with touchscreen and always-on operation.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link className="button button--primary button--lg" href="https://github.com/Clawland-AI/OpenclawBox">
            View on GitHub
          </Link>
          <Link className="button button--secondary button--lg" to="/docs/quickstart">
            Try the Software
          </Link>
        </div>
      </section>

      {/* CTA */}
      <div style={s.cta}>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>
          Be the first to know.
        </h2>
        <p style={{ ...s.subtitle, margin: '0 auto 2rem' }}>
          Sign up for launch notification and exclusive early bird pricing.
        </p>
        {!submitted ? (
          <form onSubmit={handleSubmit} style={s.form}>
            <input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={s.input}
              required
            />
            <button type="submit" style={s.btn}>Notify Me</button>
          </form>
        ) : (
          <p style={{ fontSize: '1.1rem', color: '#26A69A', fontWeight: '600' }}>
            You're on the list! We'll email you when we launch.
          </p>
        )}
      </div>

      {/* Disclaimer */}
      <div style={s.disclaimer}>
        <p>
          *Cost savings of up to 90% are achievable in certain workloads with specific routing
          policies and model mixes. Results vary. See{' '}
          <Link to="/docs/benchmarks">benchmarks</Link> for methodology.
        </p>
        <p>
          Clawland Inc and ClawBox are independent projects, not affiliated with any third-party brand.
          Kickstarter pricing and delivery dates are estimates and subject to change.
        </p>
      </div>
    </Layout>
  );
}
