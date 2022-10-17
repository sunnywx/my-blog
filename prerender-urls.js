// generate prerender urls, then preact can pre-render (ssg)
// scan all blogs
const fs = require('fs')
const path = require('path')

const root = process.cwd()
const resolve = d => path.resolve(root, d)

const currentDay=()=> {
  const d=new Date;
  return [d.getFullYear(), d.getUTCMonth()+1, d.getUTCDate()].join('-')
}

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
      const cont=fs.readFileSync(resolve(childPrefix), 'utf-8')
      res.push({
        url: `/${  childPrefix.replace('.md', '')}`,
        title: cont.match(/\ntitle:(.+)\n?/)?.[1]?.trim() || '',
        date: cont.match(/\ndate:(.+)\n?/)?.[1]?.trim() || currentDay(),
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

module.exports=function (){
  return allUrls
}