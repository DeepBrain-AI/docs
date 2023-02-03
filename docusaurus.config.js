// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'DeepBrain AI DOCS',
  tagline: 'Welcome! Here you can read the documentation for the AI Human.',
  url: 'https://docs.deepbrain.io/',
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
    locales: ['en', 'ko'],
    path: 'localization/i18n',
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
        calendar: 'gregory',
      },
      ko: {
        label: '한국어',
        direction: 'ltr',
        htmlLang: 'ko-KR',
        calendar: 'gregory',
      },
    },
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
                label: '.NET',
                to: 'aihuman/windows-sdk',
              },
            ],
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://deepbrain.io',
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
                to: 'https://www.deepbrain.io/aistudios',
              },
              {
                label: 'AI Human',
                to: 'https://www.deepbrain.io/aihuman',
              },
            ],
          },
          {
            title: 'Solutions',
            items: [
              {
                label: 'Financial Services',
                to: 'https://www.deepbrain.io/solutions/finance',
              },
              {
                label: 'Retail & Commerce',
                to: 'https://www.deepbrain.io/solutions/retail',
              },
              {
                label: 'Education',
                to: 'https://www.deepbrain.io/solutions/education',
              },
              {
                label: 'Media',
                to: 'https://www.deepbrain.io/solutions/news',
              },
            ],
          },
          {
            title: 'Pricing',
            items: [
              {
                label: 'Pricing',
                to: 'https://www.deepbrain.io/pricing',
              },
            ],
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
                to: 'https://www.deepbrain.io/blog',
              },
              {
                label: 'Forum',
                to: 'https://forum.deepbrain.io/',
              },
              {
                label: 'Help',
                to: 'https://help.deepbrain.io/',
              },
            ],
          },
          {
            title: 'Company',
            items: [
              {
                label: 'About',
                to: 'https://www.deepbrain.io/company/about',
              },
              {
                label: 'Careers',
                to: 'https://www.deepbrain.io/company/careers',
              },
              {
                label: 'Contact',
                to: 'https://www.deepbrain.io/company/contact',
              },
            ],
          },
          {
            title: 'SNS',
            items: [
              {
                label: 'LinkedIn',
                to: 'https://www.linkedin.com/company/deepbrain-global/',
              },
              {
                label: 'YouTube',
                to: 'https://www.youtube.com/@deepbrainai/aihuman',
              },
              {
                label: 'Instagram',
                to: 'https://www.instagram.com/deepbrain_ai/',
              },
              {
                label: 'Facebook',
                to: 'https://www.facebook.com/DeepbrainAIGlobal',
              },
            ],
          },
        ],
        copyright: `© 2022 DeepBrain AI. All Rights Reserved`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['csharp', 'java', 'swift', 'groovy'],
      },
    }),
};

module.exports = config;
