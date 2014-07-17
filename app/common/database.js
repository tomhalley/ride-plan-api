var mongoose = require('mongoose'),
    mongooseRedisCache = require("mongoose-redis-cache"),
    config = require("./config").getConfig();

// Redis setup
mongooseRedisCache(mongoose, config.redis);
mongoose.redisClient.on("error", function() {
    console.error("Could not connect to redis at " + config.redis.host + ":" + config.redis.port);
});

// Database methods
module.exports = {
    connect: function(callBack) {
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