var rewire = require("rewire"),
    SessionRepository = rewire(process.env.PROJECT_PATH + "/app/models/repositories/SessionRepository"),
    SessionMock = require(process.env.PROJECT_PATH + "/test/mocks/models/entities/Session"),
    DatabaseMock = require(process.env.PROJECT_PATH + "/test/mocks/common/Database"),
    ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
    setUp: function(callback) {
        SessionRepository.__set__("Database", DatabaseMock);
        callback();
    },

    createSessionFromUserId: {
        testCanCreateSession: function(test){
            // Arrange
            SessionRepository.__set__("Session", SessionMock.mockInstantiation());
            var userId = new ObjectId("345093842835");

            // Act
            SessionRepository.createSessionFromUserId(userId)
                .then(function(session) {
                    test.equal(session.user_id, userId);
                    test.done();
                })
                .done();
        },
        testThrowsExceptionIfUserIdIsNotObjectId: function(test) {
            // Arrange
            var userId = "345093842835";

            // Act
            SessionRepository.createSessionFromUserId(userId)
                .fail(function(err) {
                    test.equal(err.message, "UserId was not of type 'ObjectId'");
                    test.done();
                })
                .done();
        },
        testThrowsExceptionIfNoUserIdSet: function(test) {
            // Act
            SessionRepository.createSessionFromUserId(null)
                .fail(function(err) {
                    test.equal(err.message, "Parameter 'userId' is undefined");
                    test.done();
                })
                .done();
        },
        testThrowsExceptionIfSessionCantBeSaved: function(test) {
            // Arrange
            SessionMock.mockReturnError("Failed saving session");
            var userId = new ObjectId("345093842835");

            // Act
            SessionRepository.createSessionFromUserId(userId)
                .fail(function(err) {
                    test.equal(err.message, "Failed saving session");
                    test.done();
                })
                .done();
        }
    },

    findSessionByUserId: {
        testCanFindSession: function(test) {
            // Arrange

            // Act
        },
        testReturnsNullIfNoUserFound: function(test) {
            // Arrange

            // Act
        },
        testThrowsExceptionIfNoUserIdSet: function(test) {
            // Arrange

            // Act
        },
        testThrowsExceptionIfUserCannotBeRetrieved: function(test) {
            // Arrange

            // Act
        }
    },

    findSessionByToken: {
        testCanFindSessionByToken: function(test) {
            // Arrange

            // Act
        },
        testReturnsNullIfNoSessionFound: function(test) {
            // Arrange

            // Act
        },
        testThrowsExceptionIfNoSessionTokenSet: function(test) {
            // Arrange

            // Act
        },
        testThrowsExceptionIfSessionCannotBeRetrieved: function(test) {
            // Arrange

            // Act
        }
    }
};