// webpack.prod.config.js
const { merge } = require('webpack-merge');

const common = require('./webpack.common.config');

// Copy public files into dist dirs
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "public", to: "./" },
      ],
    }),
  ]
});