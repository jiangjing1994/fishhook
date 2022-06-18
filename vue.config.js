const path = require('path')

module.exports = {
  publicPath: './',
  productionSourceMap: false,
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
  },
  configureWebpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: [
        {
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              preserveWhitespace: false,
            },
          },
        },
        {
          loader: path.resolve(__dirname, './build/md-loader/index.js'),
        },
      ],
    })
  },
}
