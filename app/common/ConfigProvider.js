module.exports = {
    getConfig: function() {
        if(process.env.NODE_ENV === null) {
            throw new Error("NODE_ENV not defined");
        }

        try {
            return require("../../config/" + process.env.NODE_ENV + ".js");
        } catch(exc) {
            throw new Error("Could not find config for '" + process.env.NODE_ENV + "'");
        }
    },
    getConnectionString: function() {
        var config = this.getConfig();
        return 'mongodb://' + config.db.host + ":" + config.db.port + "/" + config.db.database;
    }
};
