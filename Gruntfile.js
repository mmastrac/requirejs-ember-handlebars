module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		requirejs: {
			compile_development: {
				options: {
					baseUrl: '.',
					name: 'src/ember-hbs',
					out: 'dist/ember-hbs.js',
					paths: { 
						'text': 'empty:',
						'ember': 'empty:'
					},
					optimize: 'none',
					uglify: {
						beautify: true,
						no_mangle: true
					},
					pragmas: {
						optimizer: false
					},
					wrap: { 
						start: "define(['text', 'ember'], function(text, Ember) {\n", 
						end: "return plugin; \n});" 
					}
				}
			},
			compile_optimize: {
				options: {
					baseUrl: '.',
					name: 'src/ember-hbs',
					out: 'dist/ember-hbs-optimizer.js',
					include: ["handlebars", "ember-handlebars-compiler"],
					paths: { 
						'text': 'empty:',
						'handlebars': 'vendor/handlebars-1.0.0',
						'ember-handlebars-compiler': 'vendor/ember-handlebars-compiler-1.0.0',
					},
					optimize: 'none',
					uglify: {
						beautify: true,
						no_mangle: true
					},
					pragmas: {
						optimizer: true
					},
					wrap: { 
						start: "define(['text'], function(text) {\nvar Ember = { assert: function(){}, imports: {} };\n", 
						end: "\nreturn plugin; });" 
					},
					onBuildRead: function (moduleName, path, contents) {
						switch (moduleName) {
							case "ember-handlebars-compiler":
								return contents;
							case "handlebars":
								return contents.replace("var Handlebars =", "var Handlebars = Ember.imports.Handlebars =");
						}

						return contents;
					}
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-requirejs');

	grunt.registerTask('default', [ "requirejs" ]);
};
