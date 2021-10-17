const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const developmentWebpackConfig = require('../../webpack/webpack.development')
const productionWebpackConfig = require('../../webpack/webpack.production')
const shared = require('../../webpack/sharedDependencies')

const isDev = process.env.NODE_ENV === 'development'

module.exports = isDev
  ? merge(developmentWebpackConfig(), {
      entry: { app1: './src/index' },

      output: {
        publicPath: 'http://localhost:3001/'
      },

      devServer: {
        port: 3001
      },

      plugins: [
        new ReactRefreshWebpackPlugin({
          overlay: false,
          library: '__app1__'
        }),

        new ModuleFederationPlugin({
          name: 'app1',
          filename: 'remoteEntry.js',
          remotes: {
            'lib-app': 'lib_app@http://localhost:3000/remoteEntry.js',
            app2: 'app2@http://localhost:3002/remoteEntry.js'
          },
          exposes: {
            './Navigation': './src/components/Navigation',
            './routes': './src/routes'
          },
          shared
        })
      ]
    })
  : merge(productionWebpackConfig, {
      output: {
        publicPath: '/app1/'
      },

      plugins: [
        new ModuleFederationPlugin({
          name: 'app1',
          filename: 'remoteEntry.js',
          remotes: {
            'lib-app': 'lib_app@http://localhost:3000/lib-app/remoteEntry.js',
            app2: 'app2@http://localhost:3002/app2/remoteEntry.js'
          },
          exposes: {
            './Navigation': './src/components/Navigation',
            './routes': './src/routes'
          },
          shared
        })
      ]
    })
