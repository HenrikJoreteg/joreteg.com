import fs from 'fs-extra'
import recursive from 'recursive-readdir'
import marked from 'marked'
import metaMarked from 'meta-marked'
import slugger from 'slugger'
import async from 'async'
import Minimize from 'minimize'

const srcDir = __dirname + '/../posts'
const buildDir = __dirname + '/public'

// add header link a. la. github
const renderer = new marked.Renderer()
renderer.heading = function (text, level) {
  let linkableText = slugger(text.replace(/<.+>.*<\/.+>/, '').trim())
  let atag = '<a name="' + linkableText + '" class="anchor" href="#' + linkableText + '">'
  return atag + '<h' + level + '><span class="header-link"></span>' + text + '</h' + level + '></a>'
}

let stripMarkdownMetadata = function (text) {
  return text.slice(text.indexOf('...') + 3).trim()
}

recursive(srcDir, [], (err, files) => {
  if (err) console.log(err)

  async.map(files, function (file, loopCb) {
    let fileContents = fs.readFileSync(file, 'utf8')
    let cleaned = stripMarkdownMetadata(fileContents)

    // parse it for metadata
    let parsed = metaMarked(fileContents)

    // flatten silly nesting structure
    let result = parsed.meta
    let url = '/blog/' + parsed.meta.slug

    result.url = url
    result.startingFilename = file
    result.markdown = cleaned
    result.outputFile = url + '.html'
    result.date = new Date(result.date)

    // smart links in headers
    let lexed = marked.lexer(cleaned)
    let html = marked.parser(lexed, {renderer: renderer})

    let minimize = new Minimize()
    minimize.parse(html, function (err, data) {
      if (err) throw err
      result.html = data
      loopCb(null, result)
    })
  }, function (err, files) {
    if (err) throw err

      // sort by date
    files.sort((a, b) => {
      if (a.date > b.date) {
        return -1
      }
      if (a.date < b.date) {
        return 1
      }
      return 0
    })

    // create preview html snippet
    files = files.map(function (file) {
      file.preview = file.html.replace('<hr>', '')
      let start = file.preview.indexOf('<p>', 300)
      if (start !== -1) {
        file.preview = file.preview.slice(0, start).trim()
      }
      return file
    })

    let result = {
      posts: files
    }

    let filename = __dirname + '/../data.json'
    fs.outputJSON(filename, result, err => {
      if (err) {
        throw err
      } else {
        console.log('wrote data.json')
        process.exit(0)
      }
    })
  })
})
