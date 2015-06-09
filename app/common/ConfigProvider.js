"use strict";

var YAML = require('yamljs');

module.exports = {
    getConfig: function() {
        if(process.env.NODE_ENV == undefined) {
            throw new Error("NODE_ENV not defined");
        }

        if(process.env.NODE_PATH == undefined) {
            throw new Error("NODE_PATH not defined");
        }

        try {
            return YAML.load("config/" + process.env.NODE_ENV + ".yml");
        } catch(err) {
            throw new Error("Could not find config for " + process.env.NODE_ENV);
        }
    },
    getConnectionString: function() {
        var config = this.getConfig();

        var string = 'mongodb://';
        if(config.db.username !== undefined && config.db.password !== undefined) {
            string += config.db.username + ":" + config.db.password + "@";
        }
        string += config.db.host + ":" + config.db.port + "/" + config.db.database;

        return string;
    },
    getFacebookAppToken: function() {
        var config = this.getConfig();

        return config.facebook.app_id + "|" + config.facebook.app_secret;
    }
};
