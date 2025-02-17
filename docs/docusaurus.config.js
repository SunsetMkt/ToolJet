const devServerPlugin = require('./src/plugins/devServer/index.js');
import versionsArchived from './versionsArchived.json';

const baseArchivedURL = "https://archived-docs.tooljet.com/docs/";

const lastFiveArchivedVersions = versionsArchived
  .slice(0, 5)
  .map((version, index) => ({
    version,
    url: index === 0 ? baseArchivedURL : `${baseArchivedURL}${version}`
  }));

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'ToolJet',
  tagline: 'Low-code framework to Build internal tools and business apps.',
  url: 'https://docs.tooljet.ai',
  baseUrl: '/',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/tooljet-ai-favicon.svg',
  organizationName: 'ToolJet', // Usually your GitHub org/user name.
  projectName: 'ToolJet', // Usually your repo name.
  themeConfig: {
    image: 'img/tooljet-ai-og-image.png',
    announcementBar: {
      id: 'support_us',
      content:
        '⭐️ If you like ToolJet, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/ToolJet/ToolJet">GitHub</a> and follow us on <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/ToolJet">Twitter</a>',
      backgroundColor: '#4D72DA',
      textColor: '#ffffff',
      isCloseable: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true
      }
    },
    colorMode: {

    },
    navbar: {
      logo: {
        href: '/docs/',
        alt: 'ToolJet Logo',
        src: 'img/Logomark-v2.svg',
        srcDark: `img/Logomark_white-v2.svg`,
        width: 120
      },
      items: [
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
        {
          type: 'search',
          position: 'left',
        },
        {
          href: 'https://github.com/ToolJet/ToolJet',
          position: 'right',
          className: 'navbar-social-link navbar-github-logo',
          'aria-label': 'GitHub repository',
        },
        {
          href: 'https://tooljet.ai/slack',
          position: 'right',
          className: 'navbar-social-link navbar-slack-logo',
          'aria-label': 'Slack workspace',
        },
        {
          href: 'https://twitter.com/ToolJet',
          position: 'right',
          className: 'navbar-social-link navbar-twitter-logo',
          'aria-label': 'Twitter account',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Slack',
              href: 'https://tooljet.ai/slack',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/ToolJet/ToolJet',
            },
            {
              label: 'YouTube',
              href: 'https://www.youtube.com/channel/UCf1p2G5Z7fPpvlBPf4l2I1w',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/ToolJet',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ToolJet Solutions, Inc.
      <img referrerpolicy="no-referrer-when-downgrade" src="https://static.scarf.sh/a.png?x-pxid=4f00afac-ae1f-4cf6-8c53-8a2c7b3ca206" />`,
    },
    algolia: {
      appId: 'O8HQRLI0WA',
      apiKey: process.env.ALGOLIA_API_KEY || 'development', // Public API key: it is safe to commit it
      indexName: 'tooljet',
      contextualSearch: true,
      externalUrlRegex: 'external\\.com|domain\\.com',
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/ToolJet/Tooljet/blob/develop/docs/',
          includeCurrentVersion: true,
          lastVersion: '3.0.0-LTS',
          versions: {
            current : {
              label: '3.1.0-Beta 🚧',
              path: 'beta',
            },
            "2.50.0-LTS": {
              banner: 'none',
            }
          }
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/docs/1.x.x/**'],
          filename: 'sitemap.xml',
        },
        googleTagManager: isProd
          ? {
            containerId: process.env.GTM || 'development',
          }
          : undefined,
      },
    ],
  ],
  plugins: [
    devServerPlugin,
    'plugin-image-zoom',
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/docs/',
            from: '/',
          },
        ],
      },
    ],
  ],
};