// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "DeepBrain AI DOCS",
  tagline: "Welcome! Here you can read the documentation for the AI Human.",
  url: "https://deepbrainai.io/",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/db_favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "DeepBrain-AI", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/DeepBrain-AI/docs/tree/main/",
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
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "DOCS",
        logo: {
          alt: "DeepBrain AI",
          src: "img/db_logo.svg",
          href: "/",
        },
        items: [
          {
            type: "doc",
            docId: "aistudios/getting-started",
            position: "left",
            label: "AI Studios",
          },
          {
            type: "dropdown",
            //docId: 'aihuman/intro',
            position: "left",
            label: "AI Human",
            items: [
              {
                label: "JavaScript",
                to: "aihuman/web-sdk",
              },
              {
                label: "Android",
                to: "aihuman/android-sdk",
              },
              {
                label: "iOS",
                to: "aihuman/ios-sdk",
              },
              {
                label: "Unity",
                to: "aihuman/unity-sdk",
              },
              {
                label: ".NET",
                to: "aihuman/windows-sdk",
              },
            ],
          },
          {
            type: "dropdown",
            label: "AI Front",
            position: "left",
            items: [
              {
                label: "UI Customization",
                to: "aifront/ui-customization",
              },
              {
                label: "Third Party Solutions",
                to: "aifront/third-party-solutions",
              },
            ],
          },
          {
            type: "doc",
            docId: "aichat/getting-started",
            position: "left",
            label: "AI Chat",
          },
          {
            href: "https://deepbrainai.io",
            label: "Go to DeepBrain AI",
            position: "right",
          },
          {
            href: "https://github.com/DeepBrain-AI",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      colorMode: {
        defaultMode: "light",
        disableSwitch: true,
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Products",
            items: [
              {
                label: "AI Studios",
                to: "https://www.deepbrainai.io/aistudios",
              },
              {
                label: "AI Human",
                to: "https://www.deepbrainai.io/aihuman",
              },
            ],
          },
          {
            title: "Solutions",
            items: [
              {
                label: "Financial Services",
                to: "https://www.deepbrainai.io/solutions/finance",
              },
              {
                label: "Retail & Commerce",
                to: "https://www.deepbrainai.io/solutions/retail",
              },
              {
                label: "Education",
                to: "https://www.deepbrainai.io/solutions/education",
              },
              {
                label: "Media",
                to: "https://www.deepbrainai.io/solutions/news",
              },
            ],
          },
          {
            title: "Pricing",
            items: [
              {
                label: "Pricing",
                to: "https://www.deepbrainai.io/pricing",
              },
            ],
          },
          {
            title: "Resources",
            items: [
              {
                label: "Docs",
                to: "/",
              },
              {
                label: "Blog",
                to: "https://www.deepbrainai.io/blog",
              },
              {
                label: "Forum",
                to: "https://forum.deepbrainai.io/",
              },
              {
                label: "Help",
                to: "https://help.deepbrainai.io/",
              },
            ],
          },
          {
            title: "Company",
            items: [
              {
                label: "About",
                to: "https://www.deepbrainai.io/company/about",
              },
              {
                label: "Careers",
                to: "https://www.deepbrainai.io/company/careers",
              },
              {
                label: "Contact",
                to: "https://www.deepbrainai.io/company/contact",
              },
            ],
          },
          {
            title: "SNS",
            items: [
              {
                label: "LinkedIn",
                to: "https://www.linkedin.com/company/deepbrain-global/",
              },
              {
                label: "YouTube",
                to: "https://www.youtube.com/@deepbrainai/aihuman",
              },
              {
                label: "Instagram",
                to: "https://www.instagram.com/deepbrain_ai/",
              },
              {
                label: "Facebook",
                to: "https://www.facebook.com/DeepbrainAIGlobal",
              },
            ],
          },
        ],
        copyright: `© 2022 DeepBrain AI. All Rights Reserved`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["csharp", "java", "swift"],
      },
    }),
};

module.exports = config;
