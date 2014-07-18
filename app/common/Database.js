var mongoose = require('mongoose'),
    mongooseRedisCache = require("mongoose-redis-cache"),
    ConfigProvider = require("./ConfigProvider"),
    config = ConfigProvider.getConfig();

// Database methods
module.exports = {
    connect: function(callBack) {
        mongooseRedisCache(mongoose, config.redis);
        mongoose.redisClient.on("error", function() {
            console.error("Could not connect to redis at " + config.redis.host + ":" + config.redis.port);
        });

        var dbClient = mongoose.connect(ConfigProvider.getConnectionString());

        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function callback () {
            callBack(dbClient);
        });
    },
    close: function() {
        mongoose.connection.close();
        mongoose.redisClient.close();
    }
};