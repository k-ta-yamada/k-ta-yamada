const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    app: './sources/app.bundle',
    rubygems: './sources/rubygems.bundle',
    img_upload: './sources/img_upload.bundle.js',
  },
  output: {
    path: path.resolve(__dirname, './public/js/'),
    // publicPath: '/dist/',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader?presets[]=env',
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
      },
      { test: /\.svg$/,   loader: 'url-loader?mimetype=image/svg+xml' },
      { test: /\.woff$/,  loader: 'url-loader?mimetype=application/font-woff' },
      { test: /\.woff2$/, loader: 'url-loader?mimetype=application/font-woff' },
      { test: /\.eot$/,   loader: 'url-loader?mimetype=application/font-woff' },
      { test: /\.ttf$/,   loader: 'url-loader?mimetype=application/font-woff' },
      // {
      //   test: /\.(png|jpg|gif|svg)$/,
      //   loader: 'file-loader',
      //   options: {
      //     name: '[name].[ext]?[hash]'
      //   }
      // },
    ],
  },
  // http://stackoverflow.com/a/39283602/6622514
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    })
  ],
  // devtool: 'eval',
  // devtool: 'cheap-module-eval-source-map',
  devtool: 'cheap-module-source-map',
  // resolve: {
  //   alias: {
  //     'vue$': 'vue/dist/vue.esm.js',
  //   },
  // },
}
