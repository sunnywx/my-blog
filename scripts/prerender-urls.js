// generate prerender urls, then preact can pre-render (ssg)
const initialUrls=require('./initial-urls')
const {getBlogFiles}=require('./gen-articles')
const {getTopicFiles}=require('./gen-topics')

function gen() {
  const blogs=getBlogFiles()
  const topics=getTopicFiles()

  return [
    ...initialUrls,
    ...blogs,
    ...topics
  ]
}

module.exports=gen;