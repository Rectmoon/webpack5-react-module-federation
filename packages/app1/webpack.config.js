const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

const developmentWebpackConfig = require('../../webpack/webpack.development')
const productionWebpackConfig = require('../../webpack/webpack.production')
const { dependencies } = require('../../package.json')

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
  merge(productionWebpackConfig, {
    output: {
      publicPath: 'http://localhost:3001/'
    },

    plugins: [
      new ModuleFederationPlugin({
        name: "app1",
        filename: "remoteEntry.js",
        remotes: {
          // app2: "app2@http://www.rainbow2.com/app2/remoteEntry.js",
          app2: "app2@http://localhost:3002/remoteEntry.js",
        },
        exposes: {
          "./Navigation": "./src/components/Navigation",
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