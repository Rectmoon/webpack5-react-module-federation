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
      entry: './src/index',

      devtool: 'source-map',

      output: {
        publicPath: 'http://localhost:3002/'
      },

      devServer: {
        hot: true,
        liveReload: false,
        port: 3002
      },

      plugins: [
        new ModuleFederationPlugin({
          name: 'app2',
          filename: 'remoteEntry.js',
          remotes: {
            // 'lib-app': 'lib_app@http://localhost:3000/remoteEntry.js'
          },
          exposes: {
            './routes': './src/routes',
            './Welcome': './src/components/Welcome'
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
        publicPath: '/app2/'
      },

      plugins: [
        new ModuleFederationPlugin({
          name: 'app2',
          filename: 'remoteEntry.js',
          remotes: {
            // 'lib-app': 'lib_app@http://localhost:3000/lib-app/remoteEntry.js',
          },
          exposes: {
            './routes': './src/routes',
            './Welcome': './src/components/Welcome'
          },
          shared
        }),

        new ExternalTemplateRemotesPlugin()
      ]
    })
