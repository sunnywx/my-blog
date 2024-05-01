/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')
const {generateSeeds} = require('./gen-articles')
const debug=require('debug')('wx:watch:article')

const resolve = (d) => path.resolve(process.cwd(), d)

let firstRun = true

function watchArticles() {
  // watch blog dir, when update/remove file, re-generate seeds
  const watcher = chokidar.watch([
    'articles/blogs/**/*.md',
    'articles/topics/**/*'
  ], {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true
  });

  watcher.on('all', (event, path) => {
    debug(`${event}: ${path}`)

    if (!firstRun) {
      if (event === 'add') {
        // when add new file, if file is empty, no need gen seeds
        const cont = fs.readFileSync(resolve(path), 'utf-8')
        if (!cont) return
      }

      generateSeeds()
    }
  })

  setTimeout(() => {
    generateSeeds()
    firstRun = false
  }, 200)
}

module.exports = watchArticles
