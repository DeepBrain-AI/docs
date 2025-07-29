// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');
const lightTheme = themes.github;
const darkTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'DeepBrain AI DOCS',
  tagline: 'Welcome! Here you can read the documentation for the AI Human.',
  url: 'https://docs.aistudios.com/',
  baseUrl: '/',
  // onBrokenLinks: 'throw',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/db_favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'DeepBrain-AI', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en', 'ko'/*, 'zh'*/], // SyntaxError: Invalid regular expression
        docsRouteBasePath: '/',
        docsDir: 'versioned_docs/version-1.5.x',
        indexBlog: false, 
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 10,
      },
    ],
  ],

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ko', 'zh'],
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
      zh: {
        label: '中文',
        direction: 'ltr',
        htmlLang: 'zh-CN',
        calendar: 'gregory',
      }
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

          /**
           * 배포할 때는 현재 버전이 표시되지 않도록 false로 설정해야 함
           *
           * 로컬에서 작업할 때는 true로 설정하고 current 파일을 수정
           */
          includeCurrentVersion: false,
          lastVersion: '1.5.x',
          versions: {
            '1.3.x': {
              label: '1.3.x',
              path: '1.3.x',
            },
            '1.4.x': {
              label: '1.4.x',
              path: '1.4.x',
            },
            '1.5.x': {
              label: 'Latest',
              path: '/',
            },
          },
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
            docId: 'aistudioV3/getting-started',
            position: 'left',
            label: 'AI Studios V3'
          },
          {
            type: 'dropdown',
            //docId: 'aihuman/intro',
            position: 'left',
            label: 'AI Human',
            items: [
              {
                label: 'JS (Web)',
                to: 'aihuman/web-sdk',
              },
              {
                label: '.NET (Windows)',
                to: 'aihuman/windows-sdk',
              },
              {
                label: 'Unity (3D)',
                to: 'aihuman/unity-sdk',
              },
              {
                label: 'Android (Native)',
                to: 'aihuman/android-sdk',
              },
              {
                label: 'iOS (Native)',
                to: 'aihuman/ios-sdk',
              },             
            ],
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
            // dropdownItemsBefore: [
            //   { to: 'version-1.4.x', label: '1.4.x' },
            //   { to: 'version-1.3.x', label: '1.3.x' },
            // ],
            // dropdownActiveClassDisabled: true,
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://aistudios.com',
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
                to: 'https://www.aistudios.com/aistudios',
              },
              {
                label: 'AI Human',
                to: 'https://www.aistudios.com/aihuman',
              },
            ],
          },
          {
            title: 'Solutions',
            items: [
              {
                label: 'Financial Services',
                to: 'https://www.aistudios.com/solutions/finance',
              },
              {
                label: 'Retail & Commerce',
                to: 'https://www.aistudios.com/solutions/retail',
              },
              {
                label: 'Education',
                to: 'https://www.aistudios.com/solutions/education',
              },
              {
                label: 'Media',
                to: 'https://www.aistudios.com/solutions/news',
              },
            ],
          },
          {
            title: 'Pricing',
            items: [
              {
                label: 'Pricing',
                to: 'https://www.aistudios.com/pricing',
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
                to: 'https://www.aistudios.com/blog',
              },
              {
                label: 'Forum',
                to: 'https://forum.aistudios.com/',
              },
              {
                label: 'Help',
                to: 'https://help.aistudios.com/',
              },
            ],
          },
          {
            title: 'Company',
            items: [
              {
                label: 'About',
                to: 'https://www.aistudios.com/company/about',
              },
              {
                label: 'Careers',
                to: 'https://www.aistudios.com/company/careers',
              },
              {
                label: 'Contact',
                to: 'https://www.aistudios.com/company/contact',
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
        logo: {
          alt: 'DeepBrain AI Logo',
          src: 'img/ci_horizontal_white_RGB.png',
          href: 'https://aistudios.com',
          width: 368,
        },
        copyright: `Copyright © ${new Date().getFullYear()} DeepBrain AI. Built with Docusaurus.`,
      },
      prism: {
        theme: lightTheme,
        darkTheme: darkTheme,
        additionalLanguages: ['csharp', 'java', 'swift', 'groovy','bash', 'diff', 'json'],
      },
    }),
};

module.exports = config;
