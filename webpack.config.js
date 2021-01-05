const path = require('path');
const webpack = require('webpack');
const sass = require('node-sass');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled TerserPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/terser-webpack-plugin
 *
 */

const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  mode: 'development',

  entry: {
    app: './js/app.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: '[name].js',
  },

  experiments: {
    asset: true
  },

  context: path.resolve(__dirname, 'src'),

  module: {
    rules: [
      {
        test: /.(scss|css)$/,

        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: {
                auto: true
              },
              url: true,
              }
          },
          {
            loader: "sass-loader",
          },
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]'
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
    }
    ]
  },

  optimization: {
    minimizer: [new TerserPlugin()],

    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: false
    }
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    open: true,
    hot: true,
    port: 9000
  },

  // resolve: {
  //   alias: {
  //     "Images" : path.resolve(__dirname, "img"),
  //   },
  // },

  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.ProgressPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/template.html'),
      filename: 'index.html'
    }),
  ],
  
}