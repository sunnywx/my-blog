export default (config, env, helpers, options) => {
  /** you can change the config here **/
  // config.resolve.modules.unshift(
  //   path.resolve(process.cwd(), 'src')
  // )

  if(env.dev){
    // get devServer config
    // console.log('dev server: ', config.devServer)

    Object.assign(config.devServer, {
      compress: false,
      host: '127.0.0.1',
      proxy: {
        // todo: only on dev mode
        '/blog/**/preact_prerender_data.json': {
          target: 'http://127.0.0.1:9876/preload-data'
        }
      }
    })
  }

  // process.exit(0)
};