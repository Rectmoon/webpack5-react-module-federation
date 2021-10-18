const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')

const developmentWebpackConfig = require('../../webpack/webpack.development')
const productionWebpackConfig = require('../../webpack/webpack.production')
const shared = require('../../webpack/sharedDependencies')

const isDev = process.env.NODE_ENV === 'development'
module.exports = isDev
  ? merge(developmentWebpackConfig(), {
      entry: './src/index',

      devtool: 'source-map',

      output: {
        publicPath: 'http://localhost:3001/'
      },

      devServer: {
        hot: false,
        port: 3001
      },

      plugins: [
        new ModuleFederationPlugin({
          name: 'app1',
          filename: 'remoteEntry.js',
          remotes: {
            // 'lib-app': 'lib_app@http://localhost:3000/remoteEntry.js',
            app2: 'app2@http://localhost:3002/remoteEntry.js'
          },
          exposes: {
            './Navigation': './src/components/Navigation',
            './routes': './src/routes'
          },
          shared
        }),

        new ExternalTemplateRemotesPlugin(),

        new LiveReloadPlugin({
          port: 35729
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
            // 'lib-app': 'lib_app@http://localhost:3000/lib-app/remoteEntry.js',
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
