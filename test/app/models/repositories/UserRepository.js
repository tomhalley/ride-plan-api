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
    testFindUserByEmail_ReturnsUser: function(test) {
        UserRepository.findUserByEmail("tomhalley89@gmail.com", function(err, user) {
            test.equal(user.name, "Tom Halley");
            test.done();
        });
    },
    testFindUserByEmail_ReturnsNullOfNoUser: function(test) {
        UserRepository.findUserByEmail(null, function(err, user) {
            test.equal(user, null);
            test.done();
        });
    }
};
