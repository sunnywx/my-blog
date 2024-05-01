const fs = require('fs')
const path = require('path')
const yaml = require("js-yaml");

const root = process.cwd()
const resolve = d => path.resolve(root, d)

// common directory scan func
function scanDir(prefix = 'articles', res = [], cb = f => f) {
  if (!fs.existsSync(resolve(prefix))) {
    return res
  }

  const dirs = fs.readdirSync(resolve(prefix))
  dirs.forEach(d => {
    const childPrefix = [prefix, d].join('/')
    const stat = fs.statSync(resolve(childPrefix))

    if(stat.isFile()){
      cb(res, childPrefix)
    }

    if (stat.isDirectory()) {
      cb(res, childPrefix, true)
      scanDir(childPrefix, res, cb)
    }
  })

  return res
}

/**
 *
 * @param cont :raw markdown content
 */
function getMarkdownMetaInfo(cont){
  // parse meta info
  const regx=/^(---\n.+\n---\n?)(.*)/ms
  const parts=regx.exec(cont)
  let meta={}
  if(parts && parts.length){
    meta=yaml.loadAll(parts[1])
    if(Array.isArray(meta) && meta.length){
      meta=meta[0]
      cont=parts[2]
    }
  }
  return {meta, cont}
}

function guessTitleByMd(md){
  const parts=/^(.+)\n==/.exec(md)
  if(parts && parts.length > 1){
    return parts[1]
  }
  return ''
}

module.exports = {
  scanDir,
  resolve,
  getMarkdownMetaInfo,
  guessTitleByMd
}