module.exports = function (grunt) {

	const fs = require("fs");

	const nodeModules = {};
	fs.readdirSync("node_modules")
		.filter(function (x) {
			return [".bin"].indexOf(x) === -1;
		})
		.forEach(function (mod) {
			nodeModules[mod] = "commonjs " + mod;
		});

	grunt.initConfig({

		eslint: {
			target: [
				"Gruntfile.js",
				"**/*.es6"
			]
		},

		webpack: {

			options: {

				// webpack options
				entry: {
					"game": "./src/game.es6"
				},

				target: "node",

				output: {
					path: "./dist",
					filename: "[name].js",
					libraryTarget: "umd"
				},

				externals: nodeModules,

				stats: {
					colors: true,
					modules: false,
					reasons: false
				},

				progress: false,
				failOnError: true,
				watch: false,
				keepalive: false,

				module: {
					loaders: [
						{
							test: /\.es6?$/,
							exclude: /(bower_components)/,
							loader: "babel",
							query: {
								cacheDirectory: true,
								sourceMaps: true
							}
						}
					]
				}
			},

			debug: {}

		},

		shell: {
			jest: {
				command: "node ./node_modules/jest-cli/bin/jest.js --config ./jest.json"
			},
			"jest-changed": {
				command: "node ./node_modules/jest-cli/bin/jest.js --config ./jest.json -o"
			},
			"jest-coverage": {
				command: "node ./node_modules/jest-cli/bin/jest.js --config ./jest.json --coverage"
			}
		},

		watch: {
			scripts: {
				files: [].concat(
					"Gruntfile.js",
					".*",
					["**/*.es6"]),
				tasks: ["build"],
				options: {
					spawn: false,
					livereload: true
				}
			}
		},

		esdoc: {
			dist: {
				options: {
					source: "./src",
					destination: "./doc",
					coverage: true,
					test: {
						type: "jest",
						source: "./test",
						includes: ["\\.(es6)$"],
						excludes: ["\\.config\\.(js|es6)$"]
					}
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-eslint");
	grunt.loadNpmTasks("grunt-webpack");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-shell");
	grunt.loadNpmTasks("grunt-esdoc");

	grunt.registerTask("release", ["eslint", "webpack:debug", "coverage", "esdoc"]);
	grunt.registerTask("build", ["eslint", "webpack:debug", "test"]);
	grunt.registerTask("test", ["shell:jest"]);
	grunt.registerTask("coverage", ["shell:jest-coverage"]);
	grunt.registerTask("default", ["build", "watch"]);
};
