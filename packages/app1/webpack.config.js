const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
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
        publicPath: 'http://localhost:3001/'
      },

      devServer: {
        hot: true,
        port: 3001
      },

      plugins: [
        new ModuleFederationPlugin({
          name: 'app1',
          filename: 'remoteEntry.js',
          remotes: {
            // 'lib-app': 'lib_app@http://localhost:3000/remoteEntry.js',
            app2: 'app2@[app2Url]/remoteEntry.js'
          },
          exposes: {
            './Navigation': './src/components/Navigation',
            './routes': './src/routes'
          },
          shared
        }),

        new ExternalTemplateRemotesPlugin()
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
            app2: 'app2@[app2Url]/remoteEntry.js'
          },
          exposes: {
            './Navigation': './src/components/Navigation',
            './routes': './src/routes'
          },
          shared
        }),

        new ExternalTemplateRemotesPlugin()
      ]
    })
