// make it possible to require es6 modules
require('babel/register')
var webpackConfig = require('hjs-webpack')
var React = require('react')
var data = require('./data.json')
var App = require('./src/app')
var RSS = require('rss')

function renderScripts (scripts) {
  scripts || (scripts = [])
  return scripts.map(function (url) {
    return '<script src="' + url + '"></script>'
  }).join('')
}

var analytics = '<script>!function(g,s,q,r,d){r=g[r]=g[r]||function(){(r.q=r.q||[]).push(arguments)};d=s.createElement(q);q=s.getElementsByTagName(q)[0];d.src=\'//d1l6p2sc9645hc.cloudfront.net/tracker.js\';q.parentNode.insertBefore(d,q)}(window,document,\'script\',\'_gs\');_gs(\'GSN-892886-O\');</script>'

var links = [
  '<link rel="alternate" type="application/rss+xml" href="https://joreteg.com/rss">',
  '<link rel="apple-touch-icon-precomposed" href="https://avatar.png">',
  '<link rel="shortcut icon" href="https://avatar.png">'
].join('')

module.exports = webpackConfig({
  in: 'src/root.js',
  out: 'public',
  clearBeforeBuild: '!(images|avatar.png)',
  serveCustomHtmlInDev: false,
  hostname: 'odin.local',
  html: function (context) {
    function render (el, scripts) {
      var contentHtml = React.renderToStaticMarkup(el)
      scripts = renderScripts(scripts)
      return '<!doctype html><head><meta charset="utf-8"/><title>Henrik Joreteg, JavaScript Consultant</title><meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/><link href="/' + context.css + '" rel="stylesheet"/>' + links + '</head><body>' + contentHtml + scripts + analytics + '</body>'
    }

    var result = {
      'index.html': render(React.createElement(App, {url: '/', posts: data.posts})),
      'blog/all.html': render(React.createElement(App, {url: '/blog/all', posts: data.posts}))
    }

    var feed = new RSS({
      title: 'Henrik Joreteg\'s blog, joreteg.com',
      description: 'Mobile web consultant, developer, and speaker',
      generator: 'node.js, sucka!',
      feed_url: 'https://joreteg.com/rss',
      site_url: 'https://joreteg.com',
      image_url: 'https://joreteg.com/avatar.png',
      webMaster: 'Henrik Joreteg',
      copyright: 'Henrik Joreteg',
      language: 'en',
      pubDate: new Date()
    })

    data.posts.forEach(function (post, index) {
      result[post.outputFile] = render(React.createElement(App, {url: post.url, posts: data.posts}), post.scripts)
      // only add last 10 items to RSS
      if (index < 10) {
        feed.item({
          title: post.title,
          description: post.html,
          url: post.url,
          author: post.author || 'Henrik Joreteg',
          date: new Date(post.date)
        })
      }
    })

    result['rss.xml'] = feed.xml()

    return result
  }
})
