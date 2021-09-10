// webpack.dev.config.js
const path = require('path');
const { merge } = require('webpack-merge');

const common = require('./webpack.common.config');
const packageJson = require(path.resolve(__dirname, '../../package.json'));

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
    port: (packageJson.devServer && packageJson.devServer.port) || 3000,
    proxy: packageJson.proxy || {},
  },

  plugins: [
    new ReactRefreshWebpackPlugin(),
  ],
})