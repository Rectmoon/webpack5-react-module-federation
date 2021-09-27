const { merge } = require("webpack-merge");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const commonConfig = require("./webpack.common");

const devConfig = {
  mode: "development",

  devServer: {
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
    })
  ],
};

module.exports = merge(commonConfig, devConfig);
