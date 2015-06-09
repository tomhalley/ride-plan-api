var rewire = require("rewire"),
    UserRepository = rewire("app/models/repositories/UserRepository"),
    DatabaseMock = require("test/mocks/common/Database"),
    UserMock = require("test/mocks/models/entities/User");

module.exports = {
    setUp: function(callback) {
        UserRepository.__set__("Database", DatabaseMock);
        callback();
    },
    tearDown: function(callback) {
        UserMock.mockReturnError(false);
        callback();
    },
    createUser: {
        testCanCreateUser: function(test) {
            // Arrange
            UserRepository.__set__("User", UserMock.mockInstantiation());

            // Act
            UserRepository.createUser(12345678, "Tom Halley", "tom.halley@gmail.com")
                .then(function(user) {
                    test.equal(user.facebook_id, 12345678);
                    test.equal(user.name, "Tom Halley");
                    test.equal(user.email, "tom.halley@gmail.com");
                    test.done();
                })
                .done();

        },
        testThrowsExceptionIfFacebookIdIsNull: function(test) {
            // Act
            UserRepository.createUser(null, "Tom Halley", "tom.halley@gmail.com")
                .fail(function(err) {
                    test.equal(err.message, "Parameter 'fbId' was undefined");
                    test.done();
                })
                .done();
        },
        testThrowsExceptionIfNameIsNull: function(test) {
            // Act
            UserRepository.createUser(12345678, null, "tom.halley@gmail.com")
                .fail(function(err) {
                    test.equal(err.message, "Parameter 'name' was undefined");
                    test.done();
                })
                .done();
        },
        testThrowsExceptionIfEmailIsNull: function(test) {
            // Act
            UserRepository.createUser(12345678, "Tom Halley", null)
                .fail(function(err) {
                    test.equal(err.message, "Parameter 'email' was undefined");
                    test.done();
                })
                .done();
        },
        testThrowsExceptionIfUserCouldNotBeSaved: function(test) {
            // Arrange
            UserMock.mockReturnError("Failed saving user");

            // Act
            UserRepository.createUser(12345678, "Tom Halley", "tom.halley@gmail.com")
                .fail(function(err) {
                    test.equal(err.message, "Failed saving user");
                    test.done();
                })
                .done();
        }
    },
    findUserById: {
        testCanFindUser: function(test) {
            // Arrange
            UserRepository.__set__("User", UserMock);
            var userId = 123098172;

            // Act
            UserRepository.findUserById(userId)
                .then(function(user) {
                    test.equal(user._id, userId);
                    test.done();
                })
                .done();
        },
        testThrowsExceptionIfUserIdIsNull: function(test) {
            // Act
            UserRepository.findUserById(null)
                .fail(function(err) {
                    test.equal(err.message, "Parameter 'userId' was undefined");
                    test.done();
                })
                .done();
        },
        testThrowsExceptionIfCouldNotRetrieveUser: function(test) {
            // Arrange
            UserMock.mockReturnError("Failed finding user");

            // Act
            UserRepository.findUserById(12314433)
                .fail(function(err) {
                    test.equal(err.message, "Failed finding user");
                    test.done();
                })
                .done();
        }
    },
    findUserByFacebookId: {
        testCanFindUser: function(test) {
            // Arrange
            UserRepository.__set__("User", UserMock);
            var facebookId = 123098172;

            // Act
            UserRepository.findUserByFacebookId(facebookId)
                .then(function(user) {
                    test.equal(user.facebook_id, facebookId);
                    test.done();
                })
                .done();
        },
        testThrowsExceptionIfFacebookIdIsNull: function(test) {
            // Act
            UserRepository.findUserByFacebookId(null)
                .fail(function(err) {
                    test.equal(err.message, "Parameter 'facebookId' was undefined");
                    test.done();
                })
                .done();
        },
        testThrowsExceptionIfCouldNotRetrieveUser: function(test) {
            // Arrange
            UserMock.mockReturnError("Failed finding user");

            // Act
            UserRepository.findUserByFacebookId(1234564)
                .fail(function(err) {
                    test.equal(err.message, "Failed finding user");
                    test.done();
                })
                .done();
        }
    },
    findUserByEmail: {
        testCanFindUser: function(test) {
            // Arrange
            UserRepository.__set__("User", UserMock);
            var email = "tomhalley89@gmail.com";

            // Act
            UserRepository.findUserByEmail(email)
                .then(function(user) {
                    test.equal(user.email, email);
                    test.done();
                })
                .done();
        },
        testThrowsExceptionIfEmailIsNull: function(test) {
            // Act
            UserRepository.findUserByEmail(null)
                .fail(function(err) {
                    test.equal(err.message, "Parameter 'email' was undefined");
                    test.done();
                })
                .done();
        },
        testThrowsExceptionIfCouldNotRetrieveUser: function(test) {
            // Arrange
            UserMock.mockReturnError("Failed finding user");

            // Act
            UserRepository.findUserByEmail("tomhalley89@gmail.com")
                .fail(function(err) {
                    test.equal(err.message, "Failed finding user");
                    test.done();
                })
                .done();
        }
    }
};
