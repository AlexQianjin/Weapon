const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// the path(s) that should be cleaned
let pathsToClean = [
  'build'
];
 
// the clean options to use
let cleanOptions = {
  root:     path.resolve(__dirname),
  verbose:  true,
  dry:      false
};

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build')
	},
	plugins: [
		new CleanWebpackPlugin(pathsToClean, cleanOptions),
		new HtmlWebpackPlugin({
			template: './public/index.html',
			inject: false
		})
	],
  module: {
		rules: [{
			test: /\.(js|jsx)$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env', '@babel/preset-react']
				}
			}
		}]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
		compress: true,
		// proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     pathRewrite: {'^/api' : 'api'}
    //   }
		// },
		proxy: {
      '/api': 'http://localhost:3000'
    },
    port: 9000
  }
};