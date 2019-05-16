const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const SRC_DIR = path.resolve();
const BUILD_DIR  = path.resolve();

module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, 'src/client/index.js'),
  },
  output: {
    path: path.join(__dirname, '../build'),
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './',
    watchContentBase: true,
    historyApiFallback: true,
    hot: true,
    https: false,
    host: '0.0.0.0',
    port: 5001,
    disableHostCheck: true,
    proxy: {
      '/': {
        target: 'http://localhost:5000'
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|lib)/,
        loader: require.resolve('babel-loader')
      },
      {
        test: /\.(scss|sass|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
          }
        ]
      },
      {
        test: /\.(less)$/,
        include: /node_modules/,
        use:[ 'style-loader', 'css-loader',  {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
            modifyVars: {
              'primary-color': '#4B87FD',
            },
          },
        }],
      },
      {
        test: /\.(less)$/,
        exclude: /node_modules/,
        use:[ 'style-loader', {
          loader:'css-loader',
          options: {
            localIdentName: '[local]',
            modules: true,
            minimize: true,
            camelCase: true,
            importLoaders: 1
          }
        }, 'less-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|svg|JPG)$/,
        use: {
          loader: 'url-loader'
        }
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: '@svgr/webpack',
            options: {
              babel: false,
              icon: true,
            },
          },
        ],
      },
      // {
      //   test: /url\.svg$/,
      //   use: ['@svgr/webpack', 'url-loader'],
      // },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),// just for development
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/client/index.html'),
      inject: 'body',
      favicon: 'src/assets/icon.png'
    }),
  ],
};

// mexport default module;