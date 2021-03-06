const path = require('path')
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const commonConfig = require("./webpack.common");

const prodConfig = {
  mode: "production",

  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: "[name].[contenthash:8].bundle.js",
    chunkFilename: "[name].[contenthash:8].chunk.js",
  },

  plugins: [
    new CleanWebpackPlugin({
      verbose: true
    }),
  ]
};

module.exports = merge(commonConfig, prodConfig);
