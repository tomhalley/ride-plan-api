var sessionFixtures = require(process.env.PROJECT_PATH + "/test/fixtures/default/Session");

var returnError = false;

module.exports = {
    collection: {
        remove: function(callback) {
            callback();
        }
    },
    findOne: function(object, callback) {
        if (returnError) {
            callback(new Error(returnError));
        } else {
            if (object.user_id != undefined) {
                    for (var i = 0; i < sessionFixtures.sessions.length; i++) {
                        if (sessionFixtures.sessions[i].user_id == object.user_id) {
                            callback(null, sessionFixtures.sessions[i]);
                        }
                    }

                    callback(null, {});
            } else {
                for (var i = 0; i < sessionFixtures.sessions.length; i++) {
                    if (sessionFixtures.sessions[i].token == object.token) {
                        callback(null, sessionFixtures.sessions[i]);
                    }
                }
                callback(null, {});
            }
        }
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