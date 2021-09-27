const { merge } = require("webpack-merge");

const commonConfig = require("./webpack.common");
const deps = require("../package.json").dependencies;

const prodConfig = {
  output: {
    filename: "[name].[contenthash].js",
  },
};

module.exports = merge(commonConfig, prodConfig);
