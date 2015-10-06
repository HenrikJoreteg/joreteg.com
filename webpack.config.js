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
  '<link rel="apple-touch-icon-precomposed" href="/avatar.png">',
  '<link rel="shortcut icon" href="/avatar.png">'
].join('')

module.exports = webpackConfig({
  in: 'src/root.js',
  out: 'public',
  clearBeforeBuild: '!(images|avatar.png)',
  serveCustomHtmlInDev: false,
  hostname: 'odin.local',
  html: function (context) {
    function render (el, title, scripts) {
      var contentHtml = React.renderToStaticMarkup(el)
      scripts = renderScripts(scripts)
      title || (title = 'Henrik Joreteg\'s Blog')
      return '<!doctype html><html lang="en"><head><meta charset="utf-8"/><title>' + title + '</title><meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/><link href="/' + context.css + '" rel="stylesheet"/>' + links + '</head><body>' + contentHtml + scripts + analytics + '</body></html>'
    }

    var result = {
      'index.html': render(React.createElement(App, {url: '/', posts: data.posts})),
      '404.html': render(React.createElement(App, {url: '/404', posts: data.posts}), '404 - Not found'),
      'blog/all.html': render(React.createElement(App, {url: '/blog/all', posts: data.posts}), 'Henrik\'s Blog, all posts')
    }

    var feed = new RSS({
      title: 'Henrik Joreteg\'s Blog',
      description: 'Mobile web consultant, developer, and speaker',
      generator: 'node.js, sucka!',
      feed_url: 'https://joreteg.com/rss',
      site_url: 'https://joreteg.com',
      image_url: 'https://joreteg.com/avatar.png',
      webMaster: 'henrik@joreteg.com (Henrik Joreteg)',
      copyright: 'Henrik Joreteg',
      language: 'en',
      pubDate: new Date()
    })

    data.posts.forEach(function (post, index) {
      result[post.outputFile] = render(React.createElement(App, {url: post.url, posts: data.posts}), post.title, post.scripts)
      // only add last 10 items to RSS
      if (index < 10) {
        feed.item({
          title: post.title,
          description: post.html,
          url: 'https://joreteg.com' + post.url,
          author: post.author || 'Henrik Joreteg',
          date: new Date(post.date)
        })
      }
    })

    result['rss.xml'] = feed.xml()

    return result
  }
})
