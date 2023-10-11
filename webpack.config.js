const prod = process.env.NODE_ENV === 'production';
const isEnvProductionProfile = prod && process.argv.includes('--profile');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    path: __dirname + '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.json'],
        },
        use: ['babel-loader','ts-loader']
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.m?js$/,
        use: {
          loader: 'babel-loader'
        },
        resolve: {
          fullySpecified: false,
        }
      }
    ]
  },
  devtool: prod ? undefined : 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new MiniCssExtractPlugin(),
    new NodePolyfillPlugin({
      includeAliases: ['process', 'browser/process'],
    }),
    new NodePolyfillPlugin({
      includeAliases: ['buffer', 'Buffer'],
    }),
    new Dotenv()
  ],
  resolve: {
    fallback: {
        tls: false,
        net: false,
        zlib: false,
        path: false,
        util: false,
        url: false,
        assert: false,
        http: false,
        https: false,
        os: false,
      fs: false,
      crypto: require.resolve('crypto-browserify'),
      buffer: require.resolve('buffer'),
      stream: require.resolve('stream-browserify'),
    }
  },
};
