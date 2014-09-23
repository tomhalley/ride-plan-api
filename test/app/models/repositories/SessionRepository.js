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
    /**
     * CreateSessionFromUserId
     */
    testCreateSessionFromUserId_CanCreateSession: function(test){
        // Arrange
        SessionRepository.__set__("Session", SessionMock.mockInstantiation());
        var userId = new ObjectId("345093842835");

        // Act
        SessionRepository.createSessionFromUserId(userId)
            .fail(function(err) {
                console.error(err);
            })
            .then(function(session) {
                test.equal(session.user_id, userId);
                test.done();
            })
            .done();
    },
    testCreateSessionFromUserId_ThrowsExceptionIfUserIdIsNotObjectId: function(test) {
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
    testCreateSessionFromUserId_ThrowsExceptionIfNoUserIdSet: function(test) {
        // Act
        SessionRepository.createSessionFromUserId(null)
            .fail(function(err) {
                test.equal(err.message, "Parameter 'userId' is undefined");
                test.done();
            })
            .done();
    },
    testCreateSessionFromUserId_ThrowsExceptionIfSessionCantBeSaved: function(test) {
        // Arrange

        // Act
    },
    /**
     * FindSessionByUserId
     */
    testFindSessionByUserId_CanFindSessionByUserId: function(test) {
        // Arrange

        // Act
    },
    testFindSessionByUserId_ReturnsNullIfNoUserFound: function(test) {
        // Arrange

        // Act
    },
    testFindSessionByUserId_ThrowsExceptionIfNoUserIdSet: function(test) {
        // Arrange

        // Act
    },
    testFindSessionByUserId_ThrowsExceptionIfUserCannotBeRetrieved: function(test) {
        // Arrange

        // Act
    },
    /**
     * FindSessionByToken
     */
    testFindSessionByToken_CanFindSessionByToken: function(test) {
        // Arrange

        // Act
    },
    testFindSessionByToken_ReturnsNullIfNoSessionFound: function(test) {
        // Arrange

        // Act
    },
    testFindSessionByToken_ThrowsExceptionIfNoSessionTokenSet: function(test) {
        // Arrange

        // Act
    },
    testFindSessionByToken_ThrowsExceptionIfSessionCannotBeRetrieved: function(test) {
        // Arrange

        // Act
    }
};