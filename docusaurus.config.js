// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'DeepBrain AI DOCS',
  tagline: 'Get up to AI Human with AI Human SDK',
  url: 'https://aitalk.deepbrainai.io/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/db_favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'DeepBrain-AI', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
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
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/DeepBrain-AI/docs/tree/main/',
        },
        blog: false,
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'DOCS',
        logo: {
          alt: 'DeepBrain AI',
          src: 'img/db_logo.svg',
          href: '/',
        },
        items: [
          {
            type: 'doc',
            docId: 'aistudios/getting-started',
            position: 'left',
            label: 'AI Studios',
          },
          {
            type: 'dropdown',
            //docId: 'aihuman/intro',
            position: 'left',
            label: 'AI Human',
            items: [
              {
                label: 'JavaScript',
                to: 'aihuman/web-sdk',
              },
              {
                label: 'Android',
                to: 'aihuman/android-sdk',
              },
              {
                label: 'iOS',
                to: 'aihuman/ios-sdk',
              },
              {
                label: 'Unity',
                to: 'aihuman/unity-sdk',
              },
              {
                label: 'Windows',
                to: 'aihuman/windows-sdk',
              },
            ],
          },
          //{to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://deepbrainai.io',
            label: 'Go to DeepBrain AI',
            position: 'right',
          },
          {
            href: 'https://github.com/DeepBrain-AI',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Products',
            items: [
              {
                label: 'AI Studios',
                to: 'aistudios/getting-started',
              },
              {
                label: 'AI Human',
                to: 'aihuman/web-sdk',
              },
            ],
          },
          {
            title: 'Solutions',
            items: [
              {
                label: 'Financial Services',
                to: '/',
              },
              {
                label: 'Retail & Commerce',
                to: '/',
              },
              {
                label: 'Education',
                to: '/',
              },
              {
                label: 'Media',
                to: '/',
              },
            ],
          },
          {
            title: 'Pricing',
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Docs',
                to: '/',
              },
              {
                label: 'Blog',
                to: '/',
              },
              {
                label: 'Forum',
                to: '/',
              },
              {
                label: 'Help',
                to: '/',
              },
            ],
          },
          {
            title: 'Company',
            items: [
              {
                label: 'About',
                to: '/',
              },
              {
                label: 'Careers',
                to: '/',
              },
              {
                label: 'Contact',
                to: '/',
              },
            ],
          },
          {
            title: 'SNS',
            items: [
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/company/deepbrain-global/',
              },
              {
                label: 'YouTube',
                href: 'https://www.youtube.com/@deepbrainai/aihuman',
              },
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/deepbrain_ai/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} DeepBrain AI, Inc.`,
      },
      // prism: {
      //   theme: lightCodeTheme,
      //   darkTheme: darkCodeTheme,
      // },
    }),
};

module.exports = config;
