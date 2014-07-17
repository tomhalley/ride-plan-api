module.exports = {
    getConfig: function() {
        if(process.env.APPLICATION_ENV === null) {
            throw "APPLICATION_ENV not defined";
        }

        try {
            var config = require("../../configs/" + process.env.APPLICATION_ENV + ".js");
        } catch(exc) {
            throw "Could not find config for 'process.env.APPLICATION_ENV'";
        }

        return config;
    }
};
