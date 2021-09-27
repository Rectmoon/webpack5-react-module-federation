const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const developmentWebpackConfig = require('../../webpack/webpack.development')
const productionWebpackConfig = require('../../webpack/webpack.production')
const { dependencies } = require('../../package.json')

const isDev = process.env.NODE_ENV === 'development'

module.exports = isDev ? merge(developmentWebpackConfig, {
  devServer: {
    port: 3002
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "app2",
      filename: "remoteEntry.js",
      remotes: {
        app1: "app1@http://localhost:3001/remoteEntry.js",
      },
      exposes: {
        "./routes": "./src/routes",
      },
      shared: {
        ...dependencies,
        react: {
          eager: true,
          singleton: true,
          requiredVersion: dependencies.react,
        },
        "react-dom": {
          eager: true,
          singleton: true,
          requiredVersion: dependencies["react-dom"],
        },
      },
    }),
  ]
})
  :
  merge({ ...productionWebpackConfig }, {
    output: {
      publicPath: '/app2/'
    },

    plugins: [
      new ModuleFederationPlugin({
        name: "app2",
        filename: "remoteEntry.js",
        remotes: {
          app1: "app1@http://localhost:3001/app1/remoteEntry.js",
        },
        exposes: {
          "./routes": "./src/routes",
        },
        shared: {
          ...dependencies,
          react: {
            eager: true,
            singleton: true,
            requiredVersion: dependencies.react,
          },
          "react-dom": {
            eager: true,
            singleton: true,
            requiredVersion: dependencies["react-dom"],
          },
        },
      }),
    ]
  })