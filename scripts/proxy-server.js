const path = require("path");
const express=require('express')
const cors=require('cors')
const morgan=require('morgan')
const chokidar = require('chokidar')
const watchBlogs=require('./watch-blogs')

const resolve=d=> path.resolve(process.cwd(), d)

let allBlogs=require('../public/blog-data.json')
const fname=resolve('public/blog-data.json')

const app=express()
const port=9876

app.use(morgan('dev'))
app.use(cors())
app.use('/', express.static(path.resolve(__dirname, 'public')));

chokidar.watch(fname).on('change', (path)=> {
  delete require.cache[fname]
  allBlogs=require('../public/blog-data.json')
})

watchBlogs()

// proxy preload data for each page
app.get('/preload-data/:slug*', (req, res)=> {
  // console.log('req path: ', req.path)
  const match=req.path.match(/preload-data(.+)\/preact_prerender_data\.json/)
  let slug=match?.[1] || ''
  let content=''

  if(slug){
    let found=allBlogs.find(v=> v.url === slug)
    if(found){
      return res.json(found)
    }
  }

  res.json({
    url: slug,
    content
  })
})

app.listen(port, ()=> {
  console.log(`mock server running at: http://127.0.0.1:${port}`)
})