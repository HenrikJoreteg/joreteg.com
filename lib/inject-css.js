const fs = require('fs')
const glob = require('glob')
const css = fs.readFileSync(glob.sync('public/*.css')[0], 'utf8')
const cssMinified = require('cssmin')(css)

glob('public/**/*.html', (er, files) => {
  files.forEach(file => {
    const newFile = fs.readFileSync(file, 'utf8').replace('{{{CSS}}}', cssMinified)
    fs.writeFileSync(file, newFile)
  })
})
