const webpack = require("webpack");

module.exports = function (config) {
  config.plugins.push(
    new webpack.DefinePlugin({
      "process.env.G_KEY": `"${process.env.G_KEY}"`,
    })
  );
};
