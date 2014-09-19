"use strict";

var result;

var Response = {
    setEncoding: function(encoding) {

    },
    on: function(eventName, callback) {
        callback(result);
    }
};

module.exports = {
    setResult: function(expectedResult) {
        result = expectedResult;
    },
    get: function(optionsIn, callback) {
        callback(Response);
        return {
            on: function(event, callback) {
                return false;
            }
        }
    }
};