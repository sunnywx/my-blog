const fs = require('fs')
const path = require('path')
const marked=require('marked')
const dayjs=require('dayjs')
const debug=require('debug')('wx:gen:blog')
const initialUrls=require('./initial-urls')
const {resolve, scanDir, getMarkdownMetaInfo}=require('./common')
const {getTopicFiles, getTopicChapters}=require('./gen-topics')

// get all blog files
function getBlogFiles() {
  const regx=/(-|\/)/g  // replace date delimiter

  const blogs=scanDir('articles/blogs', [], (res, f, isDir)=> {
    if(isDir || path.extname(f) !== '.md') return

    // support two levels currently
    const fpath=resolve(f)
    const {meta, cont}=getMarkdownMetaInfo(fs.readFileSync(fpath, 'utf-8'))

    debug('enter file: ', f)

    const createTime=fs.statSync(fpath).birthtime || dayjs()

    const item={
      url: `/${f.replace('.md', '').replace('articles/blogs', 'blog')}`,
      title: meta.title || '',
      date: dayjs(meta.date || createTime).format('YYYY-MM-DD'),
      tags: meta.tags || [],
      content: cont,
    }
    if(meta.snapshot){
      item.snapshot = meta.snapshot
    }
    if(meta.author){
      item.author=meta.author
    }
    res.push(item)
  })

  // sort blogs
  return blogs.sort((p1, p2)=> {
    const t1=parseInt(p1.date.replace(regx, ''))
    const t2=parseInt(p2.date.replace(regx, ''))
    return t1 - t2 < 0 ? 1 : -1;
  })
}

// blog tree view as chapters
function getBlogTree(blogs=[]){
  let tree={}
  for(let i=0, len=blogs.length; i< len; i++){
    const cur=blogs[i];
    // check if valid blog item
    if(!(cur.url && cur.title)){
      continue;
    }
    // fixme: support tree structure in any level
    const parts=cur.url.split('/').filter(Boolean)
    const key=parts[1];  // blog date as key
    let year=''
    let month=''
    if(key.includes('-')){
      [year, month]=key.split(/-|\//);
    } else if(isFinite(parseInt(parts[2]))){
      year=key
      month=parts[2]
    }
    if(!tree[year]){
      tree[year]={}
    }
    if(!tree[year][month]){
      tree[year][month]=[]
    }
    if(!tree[year][month].find(v=> v.title === cur.title)){
      tree[year][month].push({title: cur.title, url: cur.url})
    }
  }
  return tree;
}

// gen pagination data
function savePagination(blogs){
  const maxLen=150
  const pageSize=10

  let group=[];
  for(let i=0, len=blogs.length; i< len; i++){
    let cur=blogs[i];
    // strip html tags
    let cont = marked.parse(cur.content).replace(/(<([^>]+)>)/ig, '')
    if (cont.length > maxLen) {
      cont = `${cont.slice(0, maxLen)}...`
    }

    let res={...cur, desc: cont}
    delete res.content
    delete res.tags
    group.push(res)

    if((i+1) % pageSize === 0 || i === len - 1){
      let groupId=Math.ceil((i + 1) / pageSize)
      let filename=`public/page-${groupId}.json`
      fs.writeFileSync(resolve(filename), JSON.stringify(group, null, 2))
      group=[]
      debug(`saved ${filename}`)
    }
  }
}

function saveTags(blogs){
  let tree={
    _: [] // unknown category
  }
  for(let i=0, len=blogs.length; i< len; i++){
    const cur=blogs[i];
    // check if valid blog item
    if(!(cur.url && cur.title)){
      continue;
    }
    let {tags=[], url, title}=cur;
    if(!Array.isArray(tags)){
      tags=[tags]
    }

    const r={u: url, t: title}
    if(tags.length === 0){
      tree._.push(r)
    } else {
      tags.forEach(t=> {
        if(!tree[t]){
          tree[t]=[]
        }
        tree[t].push(r)
      })
    }
  }

  fs.writeFileSync(resolve('public/tags.json'), JSON.stringify(tree, null, 2))
  debug('saved public/tags.json')
}

function generateSeeds(){
  const isDev=process.env.NODE_ENV === 'development'

  if(!fs.existsSync(resolve('public'))){
    fs.mkdirSync(resolve('public'))
  }

  const blogs=getBlogFiles()
  const topics=getTopicFiles()

  if(isDev){
    // gen all blog data, only used on dev mode
    const allUrls=[...initialUrls, ...blogs, ...topics]
    const outputFile='public/articles.json'
    fs.writeFileSync(resolve(outputFile), JSON.stringify(allUrls, null, 2))
    debug(`saved prerender urls to: ${outputFile}`)
  }

  // gen blog chapter tree
  const blogTree=getBlogTree(blogs);
  fs.writeFileSync(resolve('public/chapters.json'), JSON.stringify(blogTree, null, 2))
  debug('saved chapters.json')

  // gen all ids (url)
  const allIds=blogs.map(v=> ({u: v.url, t: v.title}))
  fs.writeFileSync(resolve('public/page-ids.json'), JSON.stringify(allIds))
  debug('saved public/page-ids.json')

  savePagination(blogs)
  saveTags(blogs)

  // gen topic chapters
  const chapters=getTopicChapters()
  const topicChapFile = 'public/topic-chapters.json'
  fs.writeFileSync(resolve(topicChapFile), JSON.stringify(chapters, null, 2))
  debug(`saved topic chapters to: ${topicChapFile}`)

  return blogs
}

module.exports={
  getBlogFiles,
  generateSeeds
}