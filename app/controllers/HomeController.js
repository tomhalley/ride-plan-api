var Database = require("../common/Database");

/**
 * Check database connection
 * @param callback
 */
var checkDatabaseConnection = function(callback) {
    Database.connect(function(err) {
        Database.close();
        callback(err);
    });
};

/**
 * Check cache connection
 * @param callback
 */
var checkRedisConnection = function(callback) {
    callback("Redis not implemented");
};

module.exports = {
    indexAction: function(req, res) {
        var scopeObject = {
            title: 'Express',
            database: '',
            redis: ''
        };

        checkDatabaseConnection(function(err) {
            if(err) {
                scopeObject.database = "Failed: " + err;
            } else {
                scopeObject.database = "Successful!";
            }

            checkRedisConnection(function(err) {
                if(err) {
                    scopeObject.redis = "Failed: " + err;
                } else {
                    scopeObject.redis = "Successful!";
                }

                res.render('index', scopeObject);
            });
        });
    }
};