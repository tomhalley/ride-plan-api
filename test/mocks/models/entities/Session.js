var sessionFixtures = require(process.env.PROJECT_PATH + "/test/fixtures/default/Session");

var returnError = false;

module.exports = {
    collection: {
        remove: function(callback) {
            callback();
        }
    },
    findOne: function(object, callback) {
        var userId = object['user_id'];

        for(var i = 0; i < sessionFixtures.length; i++) {
            if(sessionsFixtures[i]['user_id'] == userId) {
                callback(null, sessionFixtures[i]);
            }
        }

        callback(new Error("Could not find user"));
    },
    mockReturnError: function(errorMessage) {
        returnError = errorMessage;
    },
    mockInstantiation: function() {
        return function(parameters) {
            return {
                save: function (callback) {
                    if(returnError) {
                        callback(new Error(returnError));
                    } else {
                        callback(null, parameters);
                    }
                }
            }
        }
    }
};