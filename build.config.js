var path = require('path');
var webpack = require('webpack');

module.exports = {
	context: __dirname,
	entry: {
		demo: './src/game.es6'
	},
	output: {
		path: path.resolve('./dist'),
		filename: 'game.js'
	},
	module: {
		loaders: [
			{
				test: /\.(js?|es6)$/,
				exclude: /node_modules/,
				loader: 'babel'
			}
		]
	}
};