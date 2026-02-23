/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'intro',
    'quickstart',
    'architecture',
    'unified-api',
    'routing-strategies',
    'auto-failover',
    'benchmarks',
    'fleet-management',
    {
      type: 'category',
      label: 'Hardware',
      items: [
        'hardware/specs',
        'hardware/assembly-guide',
        'hardware/touchscreen-ui',
      ],
    },
    'security-privacy',
    'faq',
    'roadmap',
    'contributing',
  ],
};

module.exports = sidebars;
