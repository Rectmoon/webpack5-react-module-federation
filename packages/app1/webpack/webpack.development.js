const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const commonConfig = require("./webpack.common");
const deps = require("../package.json").dependencies;

const devConfig = {
  mode: "development",

  output: { publicPath: "http://localhost:3001/" },

  devServer: {
    port: 3001,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },

  plugins: [
    new ReactRefreshWebpackPlugin({
      overlay: false,
    }),

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
        ...deps,
        react: {
          eager: true,
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          eager: true,
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
