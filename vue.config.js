const utils = require('./build/utils.js')
const { join } = require('path')
const aliasConfig = require('./config/alias')
const { externalMap } = require('./config/index')

const setAlias = (config) => {
  const { alias } = aliasConfig
  Object.keys(alias).forEach((key) => {
    config.resolve.alias.set(key, alias[key])
  })
}
module.exports = {
  lintOnSave: !utils.isProduct,
  runtimeCompiler: true,
  productionSourceMap: false,
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  css: {
    extract: true,
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },

  configureWebpack: (config) => {
    if (utils.isProduct) {
      config.externals = externalMap
    }
  },
  devServer: {
    // 端口号
    port: 8099,
    // eslint报错页面会被遮住
    overlay: {
      warnings: true,
      errors: true
    }
  },

}
