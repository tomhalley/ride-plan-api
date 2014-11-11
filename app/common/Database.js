"use strict";

var mongoose = require('mongoose'),
    Errors = require('./Errors'),
    ConfigProvider = require("./ConfigProvider"),
    Config = ConfigProvider.getConfig(),
    Q = require("q");

// Database methods
module.exports = {
    connect: function() {
        var deferred = Q.defer();

        if(process.env.NODE_ENV === 'dev') {
            mongoose.set('debug', true);
        }

        mongoose.connect(ConfigProvider.getConnectionString(), Config.db.options);

        var db = mongoose.connection;
        db.on('error', function(err) {
            console.error(err);
            console.log(ConfigProvider.getConnectionString());
            deferred.reject(new Errors.ServiceUnavailable("Failed connecting to database"));
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