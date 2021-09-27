const { merge } = require("webpack-merge");

const commonConfig = require("./webpack.common");

const prodConfig = {
  output: {
    filename: "[name].[contenthash].js",
  },
};

module.exports = merge(commonConfig, prodConfig);
