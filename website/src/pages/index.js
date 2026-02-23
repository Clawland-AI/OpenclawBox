import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header style={{ padding: '4rem 0', textAlign: 'center', background: 'var(--ifm-background-color)' }}>
      <div className="container">
        <img src="/img/logo.png" alt="ClawBox" style={{ maxWidth: '300px', marginBottom: '1.5rem' }} />
        <h1 style={{ fontSize: '2.5rem' }}>{siteConfig.title}</h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--ifm-color-emphasis-700)' }}>
          {siteConfig.tagline}
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
          <Link className="button button--primary button--lg" to="/docs/quickstart">
            Get Started
          </Link>
          <Link className="button button--secondary button--lg" to="/docs/architecture">
            Architecture
          </Link>
          <Link
            className="button button--secondary button--lg"
            href="https://github.com/Clawland-AI/OpenclawBox"
          >
            GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}

function Feature({ title, description }) {
  return (
    <div style={{ flex: 1, padding: '1.5rem', textAlign: 'center' }}>
      <h3>{title}</h3>
      <p style={{ color: 'var(--ifm-color-emphasis-700)' }}>{description}</p>
    </div>
  );
}

export default function Home() {
  return (
    <Layout title="Home" description="ClawBox — plug-and-play AI appliance">
      <HomepageHeader />
      <main style={{ padding: '3rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <Feature
              title="Cheaper"
              description="Smart routing across 38+ models. Up to 90% cost reduction in certain workloads by routing simple queries to free/cheap models."
            />
            <Feature
              title="Reliable"
              description="Automatic failover when providers go down. Rate limited? Timeout? ClawBox switches to the next provider seamlessly."
            />
            <Feature
              title="Governed"
              description="Fleet device management, OTA updates, per-device rate limiting, and metadata-only audit trails. Privacy by default."
            />
          </div>
        </div>
      </main>
    </Layout>
  );
}
