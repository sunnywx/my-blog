const path=require('path')
const fs = require("fs")
const debug=require('debug')('wx:gen:topic')
const {resolve, scanDir, getMarkdownMetaInfo, guessTitleByMd}=require('./common')
const {Tree}=require('../utils/dir-tree/tree')

function getTopicFiles(){
  return scanDir('articles/topics', [], (res, f, idDir)=> {
    if(idDir || path.extname(f) !== '.md') return

    // debug('enter file: ', f)

    const {meta, cont}=getMarkdownMetaInfo(fs.readFileSync(resolve(f), 'utf-8'))

    const item={
      url: `/${f.replace('.md', '').replace('articles/topics', 'topic')}`,
      title: meta.title || guessTitleByMd(cont),
      content: cont
    }
    res.push(item)
  })
}

function getTopicChapters(){
  const prefix='articles/topics'
  const tree=new Tree()
  tree.insertNode({root: true}, [])

  scanDir(prefix, tree, (parent, f, isDir)=> {
    const normalizedKey=`/${f.replace(prefix, 'topic')}`
    if(!isDir && path.extname(f) === '.md'){
      // debug('enter topic file: ', f)

      const {meta, cont}=getMarkdownMetaInfo(fs.readFileSync(resolve(f), 'utf-8'))
      const item={
        url: normalizedKey.replace('.md', ''),
        title: meta.title || guessTitleByMd(cont),
      }
      tree.insertNode(item)
    }

    if(isDir){
      // debug('enter topic dir: ', f)

      tree.insertNode({
        url: normalizedKey,
        title: f.slice(f.lastIndexOf('/')+1)
      }, [])
    }
  })

  return tree.toJson()
}

module.exports={
  getTopicChapters,
  getTopicFiles
}