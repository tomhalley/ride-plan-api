//var Db = require('mongodb').Db,
//    Server = require('mongodb').Server,
//    configLoader = require("../common/config");
//
//var dbClient = null;
//
//module.exports = {
//    getConnection: function(callback) {
//        if(dbClient !== null) {
//            callback(dbClient);
//        }
//
//        var config = configLoader.getConfig();
//
//        var db = new Db(config.db.database, new Server(config.db.host, config.db.port), {journal: true});
//        db.open(function(err, db) {
//            dbClient = db;
//            callback(dbClient);
//        });
//    }
//};

var mongoose = require('mongoose'),
    configLoader = require("../common/config");

var dbClient = null;

module.exports = {
    connect: function(callBack) {
        if(dbClient != null && dbClient.readyState !== 1) {
            callBack();
        }

        var config = configLoader.getConfig();

        mongoose.connect('mongodb://' + config.db.host + "/" + config.db.database);

        dbClient = mongoose.connection;
//        dbClient.on('error', console.error.bind(console, 'connection error:'));
//        dbClient.once('open', function callback () {
//            callBack();
//        });
    }
};