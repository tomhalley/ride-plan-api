var mongoose = require('mongoose'),
    ConfigProvider = require("./ConfigProvider"),
    Config = ConfigProvider.getConfig();

// Database methods
module.exports = {
    connect: function(callBack) {
        var dbClient = mongoose.connect(ConfigProvider.getConnectionString(), Config.db.options);

        var db = mongoose.connection;
        db.on('error', function(err) {
            callBack(err, null)
        });
        db.once('open', function() {
            callBack(null, dbClient);
        });
    },
    close: function() {
        mongoose.connection.close();
    }
};