var mockery = require("mockery");

module.exports = {
    connect: function() {
        var deferred = Q.defer();

        deferred.resolve();

        return deferred.promise();
    },
    close: function() {}
};