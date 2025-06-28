const { defaultTheme } = require('vuepress');

module.exports = {
  // Set the base path for GitHub Pages deployment
  base: '/MEGAPORTFOLIOPROJECT/', // Crucial for GitHub Pages

  lang: 'en-US',
  title: 'Ghost Paranormal Investigators',
  description: 'EVP, EMF, Ectoplasm - We delve into the unknown. Site rebuilt with VuePress V2.',

  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' }],
  ],

  theme: defaultTheme({
    logo: '/images/logo_placeholder.png',

    navbar: [
      { text: 'Command Center', link: '/' },
      { text: 'Dossier', link: '/dossier/' },
      { text: 'Laboratory', link: '/laboratory/' },
      { text: 'Case Files', link: '/casefiles/' },
      { text: 'Evidence', link: '/evidence/' },
      { text: 'Chronicle', link: '/chronicle/' },
      { text: 'Oracle', link: '/oracle/' },
      { text: 'Dispatch', link: '/dispatch/' },
    ],

    sidebar: 'auto', // Auto sidebar based on headers for simplicity, can be customized further.
    // Example for more specific sidebar:
    // sidebar: {
    //   '/casefiles/': [
    //     {
    //       text: 'Case Files',
    //       children: [/* Populate with links to individual case .md files if created */],
    //     },
    //   ],
    //   '/dossier/': [{text: 'About Us Sections', children: ['/dossier/#unit-biography-genesis', '/dossier/#operational-capabilities-specializations']}]
    // },

    repo: 'BDGAMINGYT8003/MEGAPORTFOLIOPROJECT',
    repoLabel: 'GitHub',

    lastUpdated: 'Last Updated',
  }),

  plugins: [
    // Consider adding search plugin
    // ['@vuepress/plugin-search', { /* options */ }],
  ],

  markdown: {
    // anchor: { permalink: true, permalinkBefore: true, permalinkSymbol: '#' },
  },

  port: 8080,
};
