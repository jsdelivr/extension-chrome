const path = require('path');
const SizePlugin = require('size-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	devtool: 'source-map',
	stats: {
		all: false,
		errors: true,
		builtAt: true,
	},
	entry: {
		'content-github': './src/content-github',
		'content-npm': './src/content-npm',
		background: './src/background'
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
		]
	},
	plugins: [
		new SizePlugin(),
		new CopyWebpackPlugin([
			{
				from: '*',
				context: 'src',
				ignore: [
					'*.js',
					'*.css'
				]
			},
			{
				from: 'popup.css',
				context: 'src',
			},
			{
				from: 'node_modules/webextension-polyfill/dist/browser-polyfill.min.js'
			}
		]),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		})
	]
}
