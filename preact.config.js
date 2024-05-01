export default (config, env, helpers, options) => {
  /** you can change the config here **/
  // config.resolve.modules.unshift(
  //   path.resolve(process.cwd(), 'src')
  // )

  const prismConfig = ["prismjs", {
      languages: ["javascript", "css", "markup", "bash", 'md'],
      plugins: ["line-numbers"],
      theme: "twilight",
      css: true
    }]

    // override babel config
  let { rule } = helpers.getLoadersByName(config, 'babel-loader')[0];
  let babelConfig = rule.options;

  babelConfig.plugins.push(prismConfig)
  // console.log('babel: ', babelConfig)

  if(env.dev){
    const prefix='http://127.0.0.1:9876'

    Object.assign(config.devServer, {
      compress: false,
      host: '127.0.0.1',
      static: ['public'],
      proxy: {
        '/(blog|topic)/**/preact_prerender_data.json': {
          target: `${prefix}/preload-data`
        },
        // '/': {
        //   target: prefix,
        //   bypass: (req, res, options)=> {
        //     console.log('req.path: ', req.path)
        //     if(req.path.endsWith('preact_prerender_data.json')){
        //       return `/preload-data${req.path}`
        //     }
        //     return req.url;
        //   }
        // }
      }
    })
  }

  // get devServer config
  // console.log('dev server: ', config.devServer)

  // process.exit(0)
};