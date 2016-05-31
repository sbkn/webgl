var path = require("path");
module.exports = {
	entry: "./src/init-webgl.es6",
	output: {
		path: __dirname + "/dist",
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{
				test: /.es6$/,
				loader: "babel-loader"
			}
		]
	}
};