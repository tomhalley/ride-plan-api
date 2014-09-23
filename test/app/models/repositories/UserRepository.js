var rewire = require("rewire"),
    UserRepository = rewire(process.env.PROJECT_PATH + "/app/models/repositories/UserRepository"),
    DatabaseMock = require(process.env.PROJECT_PATH + "/test/mocks/common/Database");

module.exports = {
    setUp: function(callback) {
        UserRepository.__set__("Database", DatabaseMock);
        callback();
    },
    createUser: {
        testCanCreateUser: function(test) {
            // Arrange

        },
        testThrowsExceptionIfFacebookIdIsNull: function(test) {

        },
        testThrowsExceptionIfNameIsNull: function(test) {

        },
        testThrowsExceptionIfEmailIsNull: function(test) {

        },
        testThrowsExceptionIfUserCouldNotBeSaved: function(test) {

        }
    },
    findUserById: {
        testCanFindUser: function(test) {

        },
        testReturnsNullIfNoUserCouldBefound: function(test) {

        },
        testThrowsExceptionIfUserIdIsNull: function(test) {

        },
        testThrowsExceptionIfCouldNotRetrieveUser: function(test) {

        }
    },
    findUserByFacebookId: {
        testCanFindUser: function(test) {

        },
        testReturnsNullIfNoUserCouldBefound: function(test) {

        },
        testThrowsExceptionIfFacebookIdIsNull: function(test) {

        },
        testThrowsExceptionIfCouldNotRetrieveUser: function(test) {

        }
    },
    findUserByEmail: {
        testCanFindUser: function(test) {

        },
        testReturnsNullIfNoUserCouldBefound: function(test) {

        },
        testThrowsExceptionIfEmailIsNull: function(test) {

        },
        testThrowsExceptionIfCouldNotRetrieveUser: function(test) {

        }
    }
};
