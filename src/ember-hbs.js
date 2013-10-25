//>>includeStart("optimizer", pragmas.optimizer)
        var buildMap = {};
//>>includeEnd("optimizer")
        var plugin = {
            version: "1.0.0",
//>>excludeStart("optimizer", pragmas.optimizer)
            pluginBuilder: "ember-hbs-optimizer",
//>>excludeEnd("optimizer")
            load: function (name, parentRequire, onload, config) {
                "use strict";
                var pluginConfig = config.hbs || {};
                pluginConfig.suffix = pluginConfig.suffix == null ? '.hbs' : pluginConfig.suffix;
                pluginConfig.processName = pluginConfig.processName || function(name) {
                    return name + pluginConfig.suffix;
                };
                
                var moduleName = pluginConfig.processName(name);

//>>includeStart("optimizer", pragmas.optimizer)
                // Precompile the template.
                var fn = function (contents) {
                    try {
                        buildMap[name] = Ember.Handlebars.precompile(contents);
                    } catch (e) {
                        console.log(e);
                    }
                    return onload();
                };
//>>includeEnd("optimizer")
//>>excludeStart("optimizer", pragmas.optimizer)
                // Get the text for the template and compile it for Ember.
                var fn = function (contents) {
                    onload(Ember.Handlebars.compile(contents));
                };
//>>excludeEnd("optimizer")
                fn.error = function() {
                    console.log("Failed to load template: " + moduleName);
                };
                text.load(moduleName, parentRequire, fn, config);
            },
//>>includeStart("optimizer", pragmas.optimizer)
            write: function (pluginName, moduleName, write, config) {
                if (buildMap.hasOwnProperty(moduleName)) {
                    var module = "/* hbs */\ndefine('" + pluginName + "!" + moduleName + "', function() { return Ember.Handlebars.template(" + buildMap[moduleName] + "); });\n";
                    write(module);
                }
            }
//>>includeEnd("optimizer")

        };
