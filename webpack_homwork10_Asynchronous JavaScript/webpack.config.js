var webpack = require('webpack')

module.exports = {
  entry: './S5/entry.js',
  output: {
    path: __dirname + '/S5/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
      // 得到jquery模块的绝对路径
      test: require.resolve('jquery'),
      // 将jquery绑定为window.jQuery
      loader: 'expose?jQuery!expose?$'
    },
      {test: /\.css$/, loader: 'style!css'},
	  {test: /\.less$/, loader: 'style!css!less'},
    { test: /\.png$/, loader: "url-loader?mimetype=image/png" }
    ]
  },
}