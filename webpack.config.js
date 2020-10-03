const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ejs = require('ejs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


// ?
const { optimize } = require('webpack');
const { join } = require('path');
const { version } = require('./package.json');

function transformHtml(content) {
  return ejs.render(content.toString(), {
    ...process.env,
  });
}

const prodPlugins = [];
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push(
    new optimize.AggressiveMergingPlugin(),
    new optimize.OccurrenceOrderPlugin(),
  );
}

const config = {
  mode: process.env.NODE_ENV,
  devtool: 'inline-source-map',
  entry: {
    content: join(__dirname, 'src/content/content.js'),
    background: join(__dirname, 'src/background/'),
    popup: join(__dirname, 'src/popup/popup.js'),
    options: join(__dirname, 'src/options/options.jsx'),
  },
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name]/[name].js',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          plugins: ['@babel/plugin-transform-runtime'],
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          outputPath: '/assets/',
          emitFile: true,
          esModule: false,
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          outputPath: '/fonts/',
          emitFile: true,
          esModule: false,
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new webpack.DefinePlugin({
      global: 'window',
    }),
    ...prodPlugins,
    new MiniCssExtractPlugin({
      filename: '[name]/[name].css',
      chunkFilename: '[id].css',
    }),
    new CopyPlugin([
      { from: 'src/assets', to: 'assets', ignore: ['icon.xcf'] },
      { from: 'src/popup/index.html', to: 'popup/index.html', transform: transformHtml },
      { from: 'src/options/index.html', to: 'options/index.html', transform: transformHtml },
      {
        from: 'manifest.json',
        to: 'manifest.json',
        transform: content => {
          const jsonContent = JSON.parse(content);
          jsonContent.version = version;

          if (config.mode === 'development') {
            jsonContent.content_security_policy = "script-src 'self' 'unsafe-eval'; object-src 'self'";
          }

          return JSON.stringify(jsonContent, null, 2);
        },
      },
    ]),
    // new BundleAnalyzerPlugin(),
  ],
  resolve: {
    extensions: ['.jsx', '.js'],
  },
};

// if (process.env.HMR === 'true') {
//   config.plugins = (config.plugins || []).concat([
//     new ExtensionReloader({
//       manifest: `${__dirname}/manifest.json`,
//     }),
//   ]);
// }

module.exports = config;
