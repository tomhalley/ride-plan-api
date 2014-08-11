var Q = require("q"),
    fixtures = require('pow-mongodb-fixtures').connect(
        require("../../common/ConfigProvider").getConnectionString()
    );

module.exports = {
    loadFixtures: function(fixtureSet) {
        var deferred = Q.defer();

        fixtures.clearAndLoad("../../../test/fixtures/" + fixtureSet, function(err) {
            if(err) {
                deferred.reject(new Error(err));
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    },
    purgeDatabase: function() {
        var deferred = Q.defer();

        fixtures.clear(function(err) {
            if(err) {
                deferred.reject(new Error(err));
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }
};