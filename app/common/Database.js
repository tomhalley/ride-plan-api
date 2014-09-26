"use strict";

var mongoose = require('mongoose'),
    ConfigProvider = require("./ConfigProvider"),
    Config = ConfigProvider.getConfig(),
    Q = require("q");

// Database methods
module.exports = {
    connect: function() {
        var deferred = Q.defer();

        mongoose.connect(ConfigProvider.getConnectionString(), Config.db.options);

        var db = mongoose.connection;
        db.on('error', function(err) {
            if (err) {
                deferred.reject(err);
            }
        });
        db.once('open', function() {
            deferred.resolve();
        });

        return deferred.promise;
    },
    close: function() {
        mongoose.connection.close();
    }
};