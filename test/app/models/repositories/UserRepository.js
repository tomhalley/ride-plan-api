var UserRepository = require("../../../../app/models/repositories/UserRepository"),
    FixtureService = require("../../../../app/models/services/FixtureService");

module.exports = {
    setUp: function(callback) {
        FixtureService.loadFixtures("default", function() {
            callback();
        });
    },
    tearDown: function(callback) {
        FixtureService.purgeDatabase(function() {
            callback();
        });
    },
    testFindUserById: function(test) {
        UserRepository.findUserById(1, function(err, user) {
            test.equal(user.name, "Tom Halley");
            test.done();
        });
    },
    testFindUserByEmail: function(test) {
        test.done();
    }
};
