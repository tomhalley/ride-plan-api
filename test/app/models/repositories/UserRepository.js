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
    testFindUserById_ReturnsUser: function(test) {
        UserRepository.findUserById(1, function(err, user) {
            test.equal(user.name, "Tom Halley");
            test.done();
        });
    },
    testFindUserById_ReturnsNullIfNoUser: function(test) {
        UserRepository.findUserById(0, function(err, user) {
            test.equal(user, null);
            test.done();
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
