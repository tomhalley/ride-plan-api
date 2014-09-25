"use strict";

var returnsError;

module.exports = {
    findOne: function(object, callback) {
        if(returnsError) {
            callback(new Error(returnsError));
        } else {
            callback(null, object)
        }
    },
    mockReturnError: function(errorMessage) {
        returnsError = errorMessage;
    },
    mockInstantiation: function() {
        return function(parameters) {
            return {
                save: function(callback) {
                    if(returnsError) {
                        callback(new Error(returnsError));
                    } else {
                        callback(null, parameters);
                    }
                }
            }
        }
    }
};
