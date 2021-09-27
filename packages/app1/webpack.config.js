const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

const developmentWebpackConfig = require('../../webpack/webpack.development')
const productionWebpackConfig = require('../../webpack/webpack.production')
const shared = require('../../webpack/sharedDependencies')

const isDev = process.env.NODE_ENV === 'development'

module.exports = isDev ? merge(developmentWebpackConfig, {
  output: {
    publicPath: 'http://localhost:3001/'
  },

  devServer: {
    port: 3001
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "app1",
      filename: "remoteEntry.js",
      remotes: {
        app2: "app2@http://localhost:3002/remoteEntry.js",
      },
      exposes: {
        "./Navigation": "./src/components/Navigation",
        "./routes": "./src/routes",
      },
      shared
    }),
  ]
})
  :
  merge(productionWebpackConfig, {
    output: {
      publicPath: '/app1/'
    },

    plugins: [
      new ModuleFederationPlugin({
        name: "app1",
        filename: "remoteEntry.js",
        remotes: {
          app2: "app2@http://localhost:3002/app2/remoteEntry.js",
        },
        exposes: {
          "./Navigation": "./src/components/Navigation",
          "./routes": "./src/routes",
        },
        shared
      }),
    ]
  })