var mongoose = require('mongoose'),
    configLoader = require("./config");

module.exports = {
    connect: function(callBack) {
        var config = configLoader.getConfig();

        var dbClient = mongoose.connect('mongodb://' + config.db.host + "/" + config.db.database);

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