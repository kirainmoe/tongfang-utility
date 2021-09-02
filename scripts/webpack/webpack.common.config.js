// webpack.common.config.js

const path = require('path');

const packageJson = require(path.resolve(__dirname, '../../package.json'));

/* Plugins */
// Clear terminal when build state changes
const CleanTerminalPlugin = require('clean-terminal-webpack-plugin');

// Display a progress bar while webpack is bundling
const ProgressBarPlugin = require('webpackbar');

// Ability to use `baseUrl` in tsconfig.json
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

// Integrate ESLint with Webpack
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// HTML template support
const HtmlWebpackPlugin = require('html-webpack-plugin');

/* Loader Test RegExp */
const typescriptRegex = /\.tsx?$/;
const lessRegex = /\.less?$/;
const nodeModulesRegex = /node_modules/;

/* Webpack Base Config */
module.exports = {
  entry: {
    index: path.resolve(__dirname, '../../src/index.tsx'),
  },

  output: {
    filename: 'assets/[name].js',
    path: path.resolve(__dirname, '../../dist'),
    publicPath: '/',
    clean: true,
  },

  stats: 'errors-warnings',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [new TsconfigPathsPlugin()]
  },

  module: {
    rules: [
      {
        test: typescriptRegex,
        exclude: nodeModulesRegex,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
      {
        test: lessRegex,
        exclude: nodeModulesRegex,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve("url-loader"),
        options: {
          limit: 8192,
          name: "assets/[name].[ext]",
        },
      },
    ]
  },

  plugins: [
    new CleanTerminalPlugin(),
    new ProgressBarPlugin(),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}',
      },
    }),
    new HtmlWebpackPlugin({
      title: packageJson.title || 'React App',
      baseUrl: packageJson.base || './',
      template: 'index.html',
    }),
  ],

  optimization: {
    usedExports: false,
  },
}