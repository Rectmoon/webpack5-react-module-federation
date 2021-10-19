const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: 'development',

  entry: {
    lib_app: './index.js'
  },

  output: {
    publicPath: isDev ? 'http://localhost:3000/' : '/lib-app/',
    clean: true
  },

  devServer: {
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization'
    }
  },

  plugins: [
    new ReactRefreshWebpackPlugin({
      overlay: false,
      library: '__lib_app__'
    }),

    new ModuleFederationPlugin({
      name: 'lib_app',
      filename: 'remoteEntry.js',
      exposes: {
        './react': 'react',
        './react-dom': 'react-dom',
        './react-router-dom': 'react-router-dom'
        // './contexts': './src/contexts/index.js'
      }
    })
  ]
}
