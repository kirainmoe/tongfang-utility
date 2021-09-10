// webpack.prod.config.js
const path = require('path');
const { merge } = require('webpack-merge');

const common = require('./webpack.common.config');

const packageJson = require(path.resolve(__dirname, '../../package.json'));

// Copy public files into dist dirs
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Bundle size analzser plugin 
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// JS file minifier
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public/**/*", 
          to: "./",
          globOptions: {
            dot: false,
            gitignore: true,
          },
          noErrorOnMissing: true,
        },
        ...packageJson.copyfiles,
      ],
    }),

    new BundleAnalyzerPlugin(),
  ],

  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
});
