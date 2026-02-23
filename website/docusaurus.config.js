// @ts-check
const { themes } = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ClawBox',
  tagline: 'Plug-and-play AI appliance powered by CheapRouter + Clawland-Fleet',
  favicon: 'img/logo.png',
  url: 'https://openclawbox.ai',
  baseUrl: '/',
  organizationName: 'Clawland-AI',
  projectName: 'OpenclawBox',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  trailingSlash: false,

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/Clawland-AI/OpenclawBox/tree/main/website/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/logo.png',
      navbar: {
        title: 'ClawBox',
        logo: {
          alt: 'ClawBox Logo',
          src: 'img/logo.png',
        },
        items: [
          { type: 'docSidebar', sidebarId: 'docs', position: 'left', label: 'Docs' },
          {
            href: 'https://github.com/Clawland-AI/OpenclawBox',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              { label: 'Quickstart', to: '/docs/quickstart' },
              { label: 'Architecture', to: '/docs/architecture' },
              { label: 'Benchmarks', to: '/docs/benchmarks' },
            ],
          },
          {
            title: 'Community',
            items: [
              { label: 'GitHub Discussions', href: 'https://github.com/Clawland-AI/OpenclawBox/discussions' },
              { label: 'Contributing', href: 'https://github.com/Clawland-AI/OpenclawBox/blob/main/CONTRIBUTING.md' },
            ],
          },
          {
            title: 'More',
            items: [
              { label: 'GitHub', href: 'https://github.com/Clawland-AI/OpenclawBox' },
              { label: 'ClawRouter', href: 'https://github.com/BlockRunAI/ClawRouter' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Clawland Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: themes.github,
        darkTheme: themes.dracula,
      },
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true,
      },
    }),
};

module.exports = config;
