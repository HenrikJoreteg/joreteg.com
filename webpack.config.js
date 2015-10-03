// make it possible to require es6 modules
require('babel/register')
var webpackConfig = require('hjs-webpack')
var React = require('react')
var data = require('./data.json')
var App = require('./src/app')

module.exports = webpackConfig({
  in: 'src/root.js',
  out: 'public',
  clearBeforeBuild: true,
  serveCustomHtmlInDev: false,
  html: function (context) {
    function render (el) {
      var contentHtml = React.renderToStaticMarkup(el)
      return '<!doctype html><head><meta charset="utf-8"/><title>Henrik Joreteg, JavaScript Consultant</title><meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/><link href="' + context.css + '" rel="stylesheet"/></head><body>' + contentHtml + '</body></script>'
    }

    var result = {
      'index.html': render(React.createElement(App, {url: '/', posts: data.posts}))
    }

    data.posts.forEach(function (post) {
      result[post.outputFile] = render(React.createElement(App, {url: post.url, posts: data.posts}))
    })

    return result
  }
})
