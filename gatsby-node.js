/* eslint-env node */

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

module.exports.createPages = require('./create-pages.ts').default

// module.exports.onCreateWebpackConfig = function onCreateWebpackConfig({
//   getConfig,
//   stage,
// }) {
//   const config = getConfig()

//   if (stage.startsWith('develop') && config.resolve) {
//     config.resolve.alias['react-dom'] = '@hot-loader/react-dom'
//   }
// }
