var rewire = require("rewire"),
    SessionRepository = rewire(process.env.PROJECT_PATH + "/app/models/repositories/SessionRepository"),
    SessionMock = require(process.env.PROJECT_PATH + "/test/mocks/models/entities/Session"),
    DatabaseMock = require(process.env.PROJECT_PATH + "/test/mocks/common/Database");

module.exports = {
    setUp: function(callback) {
        SessionRepository.__set__("Database", DatabaseMock);
        callback();
    },

    createSessionFromUserId: {
        testCanCreateSession: function(test){
            // Arrange
            SessionRepository.__set__("Session", SessionMock.mockInstantiation());
            var userId = "345093842835";

            // Act
            SessionRepository.createSessionFromUserId(userId)
                .then(function(session) {
                    test.equal(session.user_id, userId);
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
            var userId = "345093842835";

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
            SessionRepository.__set__("Session", SessionMock);
            SessionMock.mockReturnError(false);
            var userId = "230897461fh5";

            //Act
            SessionRepository.findSessionByUserId(userId)
                .then(function(session) {
                    test.equal(session.user_id, userId);
                    test.done();
                })
                .done();
        },
        testReturnsNullIfNoUserFound: function(test) {
            // Arrange
            SessionRepository.__set__("Session", SessionMock);
            var userId = "ffffffffffff";

            // Act
            SessionRepository.findSessionByUserId(userId)
                .then(function(session) {
                    test.equal(Object.keys(session).length, 0);
                    test.done();
                })
                .done();
        },
        testThrowsExceptionIfNoUserIdSet: function(test) {
            // Act
            SessionRepository.findSessionByUserId()
                .fail(function(error) {
                    test.equal(error.message, "Parameter 'userId' is undefined");
                    test.done();
                })
                .done();
        },
        testThrowsExceptionIfUserCannotBeRetrieved: function(test) {
            // Arrange
            SessionMock.mockReturnError("Failed finding session");
            var userId = "230897461fh5";

            // Act
            SessionRepository.findSessionByUserId(userId)
                .fail(function(error) {
                    test.equal(error.message, "Failed finding session");
                    test.done();
                })
                .done();
        }
    },

    findSessionByToken: {
        testCanFindSessionByToken: function(test) {
            // Arrange
            SessionRepository.__set__("Session", SessionMock);
            SessionMock.mockReturnError(false);
            var token = "1209837213894";

            //Act
            SessionRepository.findSessionByToken(token)
                .then(function(session) {
                    test.equal(session.token, token);
                    test.done();
                })
                .done();
        },
        testReturnsNullIfNoSessionFound: function(test) {
            // Arrange
            SessionRepository.__set__("Session", SessionMock);
            var token = "ffffffffffff";

            // Act
            SessionRepository.findSessionByToken(token)
                .then(function(session) {
                    test.equal(Object.keys(session).length, 0);
                    test.done();
                })
                .done();
        },
        testThrowsExceptionIfNoSessionTokenSet: function(test) {
            //Act
            SessionRepository.findSessionByToken()
                .fail(function(error) {
                    test.equal(error.message, "Parameter 'token' is undefined");
                    test.done();
                })
                .done();
        },
        testThrowsExceptionIfSessionCannotBeRetrieved: function(test) {
            // Arrange
            SessionMock.mockReturnError("Failed finding session");
            var token = "ffffffffffff";

            //Act
            SessionRepository.findSessionByToken(token)
                .fail(function(error) {
                    test.equal(error.message, "Failed finding session");
                    test.done();
                })
                .done();
        }
    }
};