const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const developmentWebpackConfig = require('../../webpack/webpack.development')
const productionWebpackConfig = require('../../webpack/webpack.production')
const shared = require('../../webpack/sharedDependencies')

const isDev = process.env.NODE_ENV === 'development'

module.exports = isDev
  ? merge(developmentWebpackConfig(), {
      entry: { app2: './src/index' },

      output: {
        publicPath: 'http://localhost:3002/'
      },

      devServer: {
        port: 3002
      },

      plugins: [
        new ReactRefreshWebpackPlugin({
          overlay: false,
          library: '__app2__'
        }),

        new ModuleFederationPlugin({
          name: 'app2',
          filename: 'remoteEntry.js',
          remotes: {
            'lib-app': 'lib_app@http://localhost:3000/remoteEntry.js',
            app1: 'app1@http://localhost:3001/remoteEntry.js'
          },
          exposes: {
            './routes': './src/routes',
            './Welcome': './src/components/Welcome'
          },
          shared
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
            'lib-app': 'lib_app@http://localhost:3000/lib-app/remoteEntry.js',
            app1: 'app1@http://localhost:3001/app1/remoteEntry.js'
          },
          exposes: {
            './routes': './src/routes',
            './Welcome': './src/components/Welcome'
          },
          shared
        })
      ]
    })
