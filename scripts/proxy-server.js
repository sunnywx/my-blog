const path = require("path");
const express=require('express')
const cors=require('cors')
const morgan=require('morgan')
const chokidar = require('chokidar')
const watchArticles=require('./watch-articles')

const resolve=d=> path.resolve(process.cwd(), d)

const app=express()
const port=9876

app.use(morgan('dev'))
app.use(cors())
app.use('/', express.static(path.resolve(__dirname, 'public')));

let articles=[]
const fname=resolve('public/articles.json')

chokidar.watch(fname).on('add', (path)=> {
  articles=require('../public/articles.json')
})

chokidar.watch(fname).on('change', (path)=> {
  // hot reload
  delete require.cache[fname]
  articles=require('../public/articles.json')
})

watchArticles()

// proxy preload data for each page
app.get('/preload-data/:slug*', (req, res)=> {
  // console.log('req path: ', req.path)
  const match=req.path.match(/preload-data(.+)\/preact_prerender_data\.json/)
  let slug=match?.[1] || ''
  let content=''

  if(slug){
    let found=articles.find(v=> v.url === slug)
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