var mongoose = require('mongoose'),
    ConfigProvider = require("./ConfigProvider");

// Database methods
module.exports = {
    connect: function(callBack) {
        var dbClient = mongoose.connect(ConfigProvider.getConnectionString());

        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function callback () {
            callBack(dbClient);
        });
    },
    close: function() {
        mongoose.connection.close();
    }
};