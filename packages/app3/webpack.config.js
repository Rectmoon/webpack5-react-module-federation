const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin')

const developmentWebpackConfig = require('../../webpack/webpack.development')
const productionWebpackConfig = require('../../webpack/webpack.production')
const shared = require('../../webpack/sharedDependencies')

const isDev = process.env.NODE_ENV === 'development'

module.exports = isDev
  ? merge(developmentWebpackConfig, {
      entry: {
        app3: './src/index'
      },

      devtool: 'source-map',

      output: {
        publicPath: 'http://localhost:3003/'
      },

      devServer: {
        hot: true,
        liveReload: false,
        port: 3003
      },

      plugins: [
        new ModuleFederationPlugin({
          name: 'app3',
          filename: 'remoteEntry.js',
          remotes: {
            // 'lib-app': 'lib_app@http://localhost:3000/remoteEntry.js'
          },
          shared
        }),

        new ExternalTemplateRemotesPlugin(),

        new ReactRefreshWebpackPlugin({
          overlay: false,
          exclude: [/node_modules/, /bootstrap\.js$/]
        })
      ]
    })
  : merge(productionWebpackConfig, {
      output: {
        publicPath: '/app3/'
      },

      plugins: [
        new ModuleFederationPlugin({
          name: 'app3',
          filename: 'remoteEntry.js',
          remotes: {
            // 'lib-app': 'lib_app@http://localhost:3000/lib-app/remoteEntry.js',
          },
          shared
        }),

        new ExternalTemplateRemotesPlugin()
      ]
    })
