var fs = require('fs-extra')
var recursive = require('recursive-readdir')
var async = require('async')
var outputDir = __dirname + '/posts_cleaned'

fs.removeSync(outputDir)
recursive(__dirname + '/posts', [], function (err, files) {
  if (err) console.log(err)

  files.sort()
  files = files.map(function (item, index) {
    var content = fs.readFileSync(item, 'utf8')
    content = content.replace('<!--', '---').replace('-->', '')
    var start = content.indexOf('raw:') + 4
    var end = content.indexOf('\n', start)
    content = content.slice(start, end).trim()
    content = JSON.parse(content)
    var lengthToTrim = (__dirname + '/posts/').length
    content.fileName = item.slice(lengthToTrim)
    return content
  })

  var knownKeys = {}

  var toKeep = [
    'id',
    'old_url',
    'slug',
    'type',
    'date',
    'tags',
    'title',
    'html5_capable',
    'thumbnail_url',
    'thumbnail_width',
    'thumbnail_height',
    'video_type',
    'url',
    'link_author',
    'link_url',
    'link_image'
  ]

  async.each(files, (file, loopCb, index) => {
    var output = [
      '---'
    ]

    if (file.type === 'photo' || file.type === 'video') {
      file.body = file.title + '\n\n' + file.body
    }

    if (file.type === 'quote') {
      delete file.title
    }

    if (file.post_url) {
      file.old_url = file.post_url
    }

    for (var key in file) {
      if (toKeep.indexOf(key) !== -1) {
        var stuff = file[key]
        if (stuff && stuff.trim) {
          stuff = stuff.trim()
          if (key === 'title' && stuff) {
            stuff = JSON.stringify(stuff)
            output.push(key + ': ' + stuff)
          } else {
            output.push(key + ': ' + stuff)
          }
        }
      }
    }

    output.push('...', '', file.body)

    output = output.join('\n')

    fs.outputFile(outputDir + '/' + file.fileName.replace('.md', '.html'), output, loopCb)
  }, function (err) {
    if (err) console.log(err)

    console.log(Object.keys(knownKeys))

    console.log('done')
  })
})
