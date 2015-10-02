// make it possible to require es6 modules
require('babel/register')
var webpackConfig = require('hjs-webpack')
var renderToStaticMarkup = require('react-dom').render

module.exports = webpackConfig({
  in: 'src/app.js',
  out: 'public',
  clearBeforeBuild: true,
  serveCustomHtmlInDev: false,
  html: function (context) {
    return {
      'index.html': context.defaultTemplate({
        html: renderToStaticMarkup('<div></div>')
      })
    }
  }
})
