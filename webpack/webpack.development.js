const { merge } = require('webpack-merge')

const commonConfig = require('./webpack.common')

const devConfig = {
  mode: 'development',

  target: 'web',

  devServer: {
    hot: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization'
    }
  }
}

module.exports = merge(commonConfig, devConfig)
