var Q = require("q");

module.exports = {
    connect: function() {
        var deferred = Q.defer();

        deferred.resolve();

        return deferred.promise;
    },
    close: function() {}
};