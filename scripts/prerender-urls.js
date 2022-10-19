// generate prerender urls, then preact can pre-render (ssg)
const {initialUrls, getBlogFiles}=require('./gen-seeds')

function gen() {
  const blogs=getBlogFiles()

  return [
    ...initialUrls,
    ...blogs
  ]
}

module.exports=gen;