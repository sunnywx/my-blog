// generate prerender urls, then preact can pre-render (ssg)
// scan all blogs
const fs = require('fs')
const path = require('path')
const marked=require('marked')
const yaml=require('js-yaml')
const dayjs=require('dayjs')

const root = process.cwd()
const resolve = d => path.resolve(root, d)

function getBlogFiles(prefix = 'blog', res) {
  res = res || []
  if (!fs.existsSync(resolve(prefix))) {
    return res
  }
  const dirs = fs.readdirSync(resolve(prefix))

  dirs.forEach(d => {
    const childPrefix = [prefix, d].join('/')
    const stat = fs.statSync(resolve(childPrefix))
    if (stat.isFile()) {
      // support two levels currently
      let cont=fs.readFileSync(resolve(childPrefix), 'utf-8')
      const regx=/^(---\n.+\n---\n?)(.+)/ms
      const parts=regx.exec(cont)
      let meta={}
      if(parts && parts.length > 2){
        meta=yaml.loadAll(parts[1])
        if(Array.isArray(meta) && meta.length){
          meta=meta[0]
          cont=parts[2]
        }
      }
      res.push({
        url: `/${  childPrefix.replace('.md', '')}`,
        // title: cont.match(/\ntitle:(.+)\n?/)?.[1]?.trim() || '',
        // date: cont.match(/\ndate:(.+)\n?/)?.[1]?.trim() || currentDay(),
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
  return res
}

const regx=/(-|\/)/g  // replace date delimiter
// sort blog by create time
const blogs = getBlogFiles().sort((p1, p2)=> {
  const t1=parseInt(p1.date.replace(regx, ''))
  const t2=parseInt(p2.date.replace(regx, ''))
  if(t1 - t2 < 0) return 1;
  if(t1 - t2 > 0) return -1;
  return 0;
})

const allUrls=[
  {
    url: '/',
    title: 'Home',
  },
  {
    url: '/about',
    title: 'About me',
  },
  ...blogs
]

// build tree view of blogs for navigation
function getBlogTree(blogs=[]){
  let tree={}
  for(let i=0, len=blogs.length; i< len; i++){
    const cur=blogs[i];
    // check if valid blog item
    if(!(cur.url && cur.title)){
      continue;
    }
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

if(!fs.existsSync(resolve('public'))){
  fs.mkdirSync(resolve('public'))
}
// gen all blog data
const outputFile='public/blog-data.json'
fs.writeFileSync(resolve(outputFile), JSON.stringify(allUrls, null, 2))
console.log(`saved pre-render urls to: ${outputFile}`)

// gen blog chapter tree
const blogTree=getBlogTree(blogs);
fs.writeFileSync(resolve('public/chapters.json'), JSON.stringify(blogTree, null, 2))
console.log('saved chapters.json')

// gen all ids (url)
function getPageIds(){
  return blogs.map(v=> ({u: v.url, t: v.title}));
}
fs.writeFileSync(resolve('public/page-ids.json'), JSON.stringify(getPageIds()))
console.log('saved all page ids')

// gen pagination data
;(function savePagination(){
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
})()

;(function saveTags(){
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
})()

module.exports=function (){
  return allUrls
}