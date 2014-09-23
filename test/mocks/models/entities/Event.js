var events = require(process.env.PROJECT_PATH + "/test/fixtures/default/Event");

var returnError = false;

module.exports = {
    find: function() {
        return {
            select: function() {
                return {
                    exec: function(callback) {
                        if(returnError) {
                            callback(new Error(returnError));
                        } else {
                            callback(null, events);
                        }
                    }
                }
            }
        }
    },
    findOne: function (queryObj, callback) {
        if(returnError) {
            callback(new Error(returnError));
        } else {
            callback(null, events[0]);
        }
    },
    mockReturnError: function(errorMessage) {
        returnError = errorMessage;
    },
    mockInstantiation: function() {
        return function(parameters) {
            return {
                save: function(callback) {
                    if(returnError) {
                        callback(new Error(returnError));
                    } else {
                        callback(null, parameters);
                    }

                }
            }
        };
    }
};