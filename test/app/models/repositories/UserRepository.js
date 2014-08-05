var UserRepository = require("../../../../app/models/repositories/UserRepository"),
    FixtureService = require("../../../../app/models/services/FixtureService");

module.exports = {
    setUp: function(callback) {
        FixtureService.loadFixtures("default", function() {
            callback();
        });
    },
    testFindUserByFacebookId_ReturnsUser: function(test) {
        UserRepository.findUserByFacebookId(76354369436, function(err, user) {
            test.equal(user.name, "Tom Halley");
            test.done();
        })
    },
    testFindUserByFacebookId_ReturnsNullIfNoUser: function(test) {
        UserRepository.findUserByFacebookId(243643653, function(err, user) {
            test.equal(user, null);
            test.done();
        })
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
