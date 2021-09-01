// webpack.dev.config.js
const { merge } = require('webpack-merge');

const common = require('./webpack.common.config');

/* react hot reload */
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');

const tsLoader = common.module.rules.find((r) => r.loader === 'ts-loader');
if (tsLoader) {
  tsLoader.options = {
    ...tsLoader.options,
    getCustomTransformers: () => ({
      before: [ReactRefreshTypeScript()],
    }),
    transpileOnly: true,
  }
}

module.exports = merge(common, {
  mode: 'development',

  devtool: 'cheap-module-source-map',

  devServer: {
    client: {
      overlay: {
        warnings: false,
      },
    },
    compress: false,
    historyApiFallback: true,
    hot: true,
    port: process.env.DEV_SERVER_PORT || 3000,
  },

  plugins: [
    new ReactRefreshWebpackPlugin(),
  ],
})