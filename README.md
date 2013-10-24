requirejs-ember-handlebars
==========================

Require.js plugin to pre-compile Ember.js handlebar templates

License: MIT

Build instructions
==================

    npm install
    node_modules/grunt-cli/bin/grunt

Usage
=====

Installation:

    // Install the plugins
    require.config({
        paths: {
          // text plugin is required for development & optimization mode
          'text': 'lib/require.js-text-2.0.9/text',
          // ember.js is required for development mode
	       	'ember': 'lib/ember.js-1.0.0/ember.prod',
	       	// development mode plugin
      		'ember-hbs': 'lib/require.js-ember-hbs-1.0.0/ember-hbs',
      		// optimizer mode plugin
	  	    'ember-hbs-optimizer': 'lib/require.js-ember-hbs-1.0.0/ember-hbs-optimizer'
	  	  }
    });

Compiling templates at development/optimization time:

    // Example plugin usage:
    define(["ember", "lodash" 
				"ember-hbs!dashboard/ember/templates/index",
				"ember-hbs!dashboard/ember/templates/todos"], 
				function(Ember, _, index_template, todos_template) {
            _.extend(Ember.TEMPLATES, { 
	              'todos': todos_template,
		            'todos/index': index_template
            });
        }
    );
	       
	

    
