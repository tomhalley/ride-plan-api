module.exports = {
    getConfig: function() {
        var env = process.env.APPLICATION_ENV;

        if(env === null) {
            throw "APPLICATION_ENV not defined";
        }

        try {
            var config = require("../../config/" + env + ".js");
        } catch(exc) {
            throw "Could not find config for '" + env + "'";
        }

        return config;
    }
};
