var UserRepository = require("../../../../app/models/repositories/UserRepository"),
    FixtureService = require("../../../../app/models/services/FixtureService");

module.exports = {
    setUp: function(callback) {
        FixtureService.loadFixtures("default")
            .then(callback)
            .done();
    },
    testFindUserByFacebookId_ReturnsUser: function(test) {
        UserRepository.findUserByFacebookId(76354369436)
            .then(function(user) {
                test.equal(user.name, "Tom Halley");
            })
            .done(function() {
                test.done();
            });
    },
    testFindUserByFacebookId_ReturnsNullIfNoUser: function(test) {
        UserRepository.findUserByFacebookId(243643653)
            .then(function(user) {
                test.equal(user, null);
            })
            .done(function() {
                test.done();
            });
    },
    testFindUserByEmail_ReturnsUser: function(test) {
        UserRepository.findUserByEmail("tomhalley89@gmail.com")
            .then(function(user) {
                test.equal(user.name, "Tom Halley");
            })
            .done(function() {
                test.done();
            });
    },
    testFindUserByEmail_ReturnsNullOfNoUser: function(test) {
        UserRepository.findUserByEmail(null)
            .then(function(user) {
                test.equal(user, null);
            })
            .done(function() {
                test.done();
            });
    },
    testCreateUser_CanCreateUser: function(test) {
        UserRepository.createUser(123456, "Bob", "bob@gmail.com")
            .then(function(user) {
                test.equal(user.name, "Bob");
            })
            .done(function() {
                test.done();
            });
    }
};
