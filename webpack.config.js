// make it possible to require es6 modules
require('babel/register')
var webpackConfig = require('hjs-webpack')
var React = require('react')
var data = require('./data.json')
var App = require('./src/app')

function renderScripts (scripts) {
  scripts || (scripts = [])
  return scripts.map(function (url) {
    return '<script src="' + url + '"></script>'
  }).join('')
}

var analytics = '<script>!function(g,s,q,r,d){r=g[r]=g[r]||function(){(r.q=r.q||[]).push(arguments)};d=s.createElement(q);q=s.getElementsByTagName(q)[0];d.src=\'//d1l6p2sc9645hc.cloudfront.net/tracker.js\';q.parentNode.insertBefore(d,q)}(window,document,\'script\',\'_gs\');_gs(\'GSN-892886-O\');</script>'

module.exports = webpackConfig({
  in: 'src/root.js',
  out: 'public',
  clearBeforeBuild: true,
  serveCustomHtmlInDev: false,
  hostname: 'odin.local',
  html: function (context) {
    function render (el, scripts) {
      var contentHtml = React.renderToStaticMarkup(el)
      scripts = renderScripts(scripts)
      return '<!doctype html><head><meta charset="utf-8"/><title>Henrik Joreteg, JavaScript Consultant</title><meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/><link href="/' + context.css + '" rel="stylesheet"/></head><body>' + contentHtml + scripts + analytics + '</body>'
    }

    var result = {
      'index.html': render(React.createElement(App, {url: '/', posts: data.posts})),
      'blog/all.html': render(React.createElement(App, {url: '/blog/all', posts: data.posts}))
    }

    data.posts.forEach(function (post) {
      result[post.outputFile] = render(React.createElement(App, {url: post.url, posts: data.posts}), post.scripts)
    })

    return result
  }
})
