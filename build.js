import fs from 'fs-extra'
import recursive from 'recursive-readdir'
import async from 'async'
import marked from 'marked'
import metaMarked from 'meta-marked'
import slugger from 'slugger'

const buildDir = __dirname + '/public'
const srcDir = __dirname + '/posts_cleaned'

// add header link a. la. github
var renderer = new marked.Renderer()
renderer.heading = function (text, level) {
  var linkableText = slugger(text.replace(/<.+>.*<\/.+>/, '').trim())
  var atag = '<a name="' + linkableText + '" class="anchor" href="#' + linkableText + '">'
  return atag + '<h' + level + '><span class="header-link"></span>' + text + '</h' + level + '></a>'
}

var stripMarkdownMetadata = function (text) {
  return text.slice(text.indexOf('...') + 3).trim()
}

fs.remove(buildDir, () => {
  recursive(srcDir, [], (err, files) => {
    if (err) console.log(err)

    files = files.map(file => {
      var fileContents = fs.readFileSync(file, 'utf8')
      var cleaned = stripMarkdownMetadata(fileContents)

      // parse it for metadata
      var parsed = metaMarked(fileContents)

      // flatten silly nesting structure
      var result = parsed.meta
      var url = '/blog/' + parsed.meta.slug

      result.html = parsed.html
      result.url = url
      result.outputFile = buildDir + url + '.html'
      result.startingFilename = file
      result.markdown = cleaned

      // create preview html snippet
      var start = parsed.html.indexOf('\n', 300)
      if (start !== -1) {
        result.preview = result.html.slice(0, start).trim()
      } else {
        result.preview = result.html
      }

      // prepare some more metadata
      result.date = new Date(result.date)
      return result
    })

    // sort by date
    files.sort((a, b) => {
      if (a.date > b.date) {
        return 1
      }
      if (a.date < b.date) {
        return -1
      }
      console.log('equal date found', a.date)
      return 0
    })

    async.each(files, (file, loopCb) => {
      if (fs.existsSync(file.outputFile)) {
        throw new Error('file by that name already exists:\n' + file.outputFile)
      }

      // smart links in headers
      var lexed = marked.lexer(file.markdown)
      var html = marked.parser(lexed, {renderer: renderer})

      console.log('writing:', file.url)
      fs.outputFile(file.outputFile, html, loopCb)
    }, function (err) {
      if (err) console.log(err)

      var html = files.slice(-5).reduce((string, file) => {
        var itemHtml = '<a href="' + file.url + '"><h3>' + file.title + '</h3></a>'
        itemHtml += file.preview
        itemHtml += '<a href="' + file.url + '">continue reading</a>'
        return string + '<article>' + itemHtml + '</article>'
      }, '')

      fs.outputFileSync(buildDir + '/' + 'index.html', html)

      console.log('done')
    })
  })
})
