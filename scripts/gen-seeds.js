const fs = require('fs')
const path = require('path')
const marked=require('marked')
const yaml=require('js-yaml')
const dayjs=require('dayjs')

const root = process.cwd()
const resolve = d => path.resolve(root, d)
const regx=/(-|\/)/g  // replace date delimiter

// get all blog dir files
function getBlogFiles(prefix = 'blog', res) {
  res = res || []
  if (!fs.existsSync(resolve(prefix))) {
    return res
  }
  const dirs = fs.readdirSync(resolve(prefix))

  dirs.forEach(d => {
    const childPrefix = [prefix, d].join('/')
    const f=resolve(childPrefix)
    const stat = fs.statSync(f)
    if (stat.isFile() && path.extname(f) === '.md') {
      // support two levels currently
      let cont=fs.readFileSync(resolve(childPrefix), 'utf-8')
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
      res.push({
        url: `/${  childPrefix.replace('.md', '')}`,
        title: meta.title || '',
        date: dayjs(meta.date || dayjs()).format('YYYY-MM-DD'),
        tags: meta.tags || [],
        content: cont
      })
    }
    if (stat.isDirectory()) {
      getBlogFiles(childPrefix, res)
    }
  })

  // sort blogs
  return res.sort((p1, p2)=> {
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
    const key=cur.url.split('/').filter(Boolean)[1];  // blog date as key
    const [year, month]=key.split(/-|\//);
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

// initial prerender urls
const initialUrls=[
  {
    url: '/',
    title: 'Home',
  },
  {
    url: '/about',
    title: 'About me',
  },
]

// gen pagination data
function savePagination(blogs){
  const maxLen=150
  const pageSize=5

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
      console.log(`saved ${filename}`)
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
  console.log('saved public/tags.json')
}

function generateSeeds(){
  const isDev=process.env.NODE_ENV === 'development'

  if(!fs.existsSync(resolve('public'))){
    fs.mkdirSync(resolve('public'))
  }

  const blogs=getBlogFiles()

  if(isDev){
    // gen all blog data, only used on dev mode
    const allUrls=[...initialUrls, ...blogs]
    const outputFile='public/blog-data.json'
    fs.writeFileSync(resolve(outputFile), JSON.stringify(allUrls, null, 2))
    console.log(`saved prerender urls to: ${outputFile}`)
  }

  // gen blog chapter tree
  const blogTree=getBlogTree(blogs);
  fs.writeFileSync(resolve('public/chapters.json'), JSON.stringify(blogTree, null, 2))
  console.log('saved chapters.json')

  // gen all ids (url)
  const allIds=blogs.map(v=> ({u: v.url, t: v.title}))
  fs.writeFileSync(resolve('public/page-ids.json'), JSON.stringify(allIds))
  console.log('saved public/page-ids.json')

  savePagination(blogs)
  saveTags(blogs)

  return blogs
}

module.exports={
  initialUrls,
  getBlogFiles,
  getBlogTree,
  generateSeeds
}