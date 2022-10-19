const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')
const {generateSeeds} = require('./gen-seeds')

const resolve = (d) => path.resolve(process.cwd(), d)

let firstRun = true

function watchBlogs(){
// watch blog dir, when update/remove file, re-generate seeds
  const watcher = chokidar.watch('blog/**/*.md', {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true
  });

  watcher.on('all', (event, path) => {
    console.log(`${event}: ${path}`)

    if (!firstRun) {
      if (event === 'add') {
        // when add new file, if file is empty, no need gen seeds
        const cont = fs.readFileSync(resolve(path), 'utf-8')
        if (!cont) return
      }

      generateSeeds()
    }
  })

  setTimeout(()=> {
    generateSeeds()
    firstRun=false
  }, 200)
}

module.exports=watchBlogs
