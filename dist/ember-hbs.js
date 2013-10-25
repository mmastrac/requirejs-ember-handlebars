define(['text', 'ember'], function(text, Ember) {

        var plugin = {
            version: "1.0.0",
            pluginBuilder: "ember-hbs-optimizer",
            load: function (name, parentRequire, onload, config) {
                
                var pluginConfig = config.hbs || {};
                pluginConfig.suffix = pluginConfig.suffix == null ? '.hbs' : pluginConfig.suffix;
                pluginConfig.processName = pluginConfig.processName || function(name) {
                    return name + pluginConfig.suffix;
                };
                
                var moduleName = pluginConfig.processName(name);

                // Get the text for the template and compile it for Ember.
                var fn = function (contents) {
                    onload(Ember.Handlebars.compile(contents));
                };
                fn.error = function() {
                    console.log("Failed to load template: " + moduleName);
                };
                text.load(moduleName, parentRequire, fn, config);
            },

        };
return plugin; 
});