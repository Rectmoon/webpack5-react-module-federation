const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: "development",

  entry: "./index.js",

  devtool: "hidden-source-map",

  output: {
    publicPath: isDev ? 'http://localhost:3000/' : "/lib-app/",
    clean: true,
  },

  devServer: {
    port: 3000
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "lib_app",
      filename: "remoteEntry.js",
      exposes: {
        "./react": "react",
        "./react-dom": "react-dom",
        "./react-router-dom": "react-router-dom",
        "./contexts": "./src/contexts/index.js",
      },
    }),
  ],
};