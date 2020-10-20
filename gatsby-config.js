/* eslint-env node */

require('source-map-support').install()
require('ts-node').register()

const config = {
  siteMetadata: {
    siteUrl: 'https://localhost:3000',
    title: 'test',
    description: 'here will be description',
    author: 'Alexey Lyakhov, Ignat Prokopovich',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true, // defaults to false
        // jsxPragma: 'jsx', // defaults to "React"
        allExtensions: true, // defaults to false
        onlyRemoveTypeImports: true,
      },
    },
    
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-root-import',
  ],
}


const bundleAnalyzer = {
  resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
  options: {
    analyzerPort: 3333,
    devMode: true,
  },
}

if (process.env.GATSBY_ANALYZE === 'analyze') {
  config.plugins = [bundleAnalyzer, ...config.plugins]
}

module.exports = config
