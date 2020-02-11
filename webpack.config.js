const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = ext => (isDev) ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const plugins = () => {
  let base = [
    new MiniCssExtractPlugin({
      filename: `assets/css/${filename('css')}`
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new CleanWebpackPlugin()
  ]

  if (isProd) {
    base.push(
      new BundleAnalyzerPlugin()
    )
  }

  if (isDev) {
    base.push(
      new webpack.SourceMapDevToolPlugin({
        filename: '[file].map'
      })
    )
  }

  return base;
}

const postCssConfig = () => {
  const base = [
    require('autoprefixer')(),
    require('css-mqpacker')(),
  ]

  if (isProd) {
    base.push(
      require('cssnano')()
    )
  }

  return base;
}

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `assets/js/${filename('js')}`,
    publicPath: isDev ? '/' : '/trelloClone/'
  },
  devtool: (isDev) ? 'cheap-module-eval-source-map' : "",
  devServer: {
    port: 3000,
    host: "0.0.0.0",
    contentBase: './dist',
    historyApiFallback: true
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: postCssConfig()
            }
          },
          'sass-loader',
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css?/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: { 
              ident: 'postcss',
              plugins: postCssConfig()
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: plugins()
}