var rewire = require("rewire"),
    FacebookService = rewire(process.env.PROJECT_PATH + "/app/models/services/FacebookService"),
    httpsMock = require(process.env.PROJECT_PATH + "/test/mocks/https"),
    SessionServiceMock = require(process.env.PROJECT_PATH + "/test/mocks/models/services/SessionService"),
    UserRepositoryMock = require(process.env.PROJECT_PATH + "/test/mocks/models/repositories/UserRepository");

module.exports = {
    /**
     * VerifyAccessToken Tests
     */
    testFacebookService_Exists: function(test) {
        test.notEqual(FacebookService, null);
        test.notEqual(FacebookService, undefined);
        test.done();
    },
    testVerifyAccessToken_ThrowsExceptionIsMissingToken: function(test) {
        // Act
        FacebookService.verifyAccessToken(null)
            .fail(function(error) {
                test.equal(error.message, "Access token parameter was null");
                test.done();
            })
            .done();
    },
    testVerifyAccessToken_ThrowsExceptionIfResponseContainsError: function(test) {
        // Arrange
        httpsMock.setResult('{"error": {"message":"No Data Returned"}}');
        FacebookService.__set__("https", httpsMock);

        // Act
        FacebookService.verifyAccessToken("1289037142342")
            .fail(function(error) {
                test.equal(error.message, "No Data Returned");
                test.done();
            })
            .done();
    },
    testVerifyAccessToken_ThrowsExceptionIfNoDataReturned: function(test) {
        // Arrange
        httpsMock.setResult("{}");
        FacebookService.__set__("https", httpsMock);

        // Act
        FacebookService.verifyAccessToken("1289037142342")
            .fail(function(error) {
                test.equal(error.message, "No Data returned from API");
                test.done();
            })
            .done();
    },
    testVerifyAccessToken_ThrowsExceptionIfAppTokenDoesntMatch: function(test) {
        // Arrange
        httpsMock.setResult('{"data": {"app_id": 100000000000,"application": "Social Cafe","expires_at": 1352419328,"is_valid": true,"issued_at": 1347235328,"scopes": ["email","publish_actions"],"user_id": 1207059}}')
        FacebookService.__set__("https", httpsMock);

        // Act
        FacebookService.verifyAccessToken("1289037142342")
            .fail(function(error) {
                test.equal(error.message, "What? The API responded with someone elses APP Id");
                test.done();
            })
            .done();
    },
    testVerifyAccessToken_ThrowsExceptionIfDataNotValid: function(test) {
        // Arrange
        httpsMock.setResult('{"data": {"app_id": 1478753505705619,"application": "Social Cafe","expires_at": 1352419328,"is_valid": false,"issued_at": 1347235328,"scopes": ["email","publish_actions"],"user_id": 1207059}}')
        FacebookService.__set__("https", httpsMock);

        // Act
        FacebookService.verifyAccessToken("1289037142342")
            .fail(function(error) {
                test.equal(error.message, "For some reason the response says the AccessToken is not valid :(");
                test.done();
            })
            .done();
    },
    testVerifyAccessToken_VerifiesAccessToken: function(test) {
        // Arrange
        httpsMock.setResult('{"data": {"app_id": 1478753505705619,"application": "Social Cafe","expires_at": 1352419328,"is_valid": true,"issued_at": 1347235328,"scopes": ["email","publish_actions"],"user_id": 1207059}}')
        FacebookService.__set__("https", httpsMock);

        // Act
        FacebookService.verifyAccessToken("1289037142342")
            .then(function(result) {
                test.equals(true, result);
                test.done();
            })
            .done();
    },

    /**
     * GetUserDetails
     */
    testGetUserDetails_ThrowsExceptionIfAccessTokenNull: function(test) {
        FacebookService.getUserDetails(null)
            .fail(function(error) {
                test.equal(error.message, "AccessToken was null");
                test.done();
            })
            .done();
    },
    testGetUserDetails_CanGetUserDetails: function(test) {
        // Arrange
        var returnJson = '{"id":"10154443099760434","email":"tomhalley89\u0040gmail.com","first_name":"Tom","gender":"male","last_name":"Halley","link":"https:\/\/www.facebook.com\/app_scoped_user_id\/10154443099760434\/","locale":"en_GB","name":"Tom Halley","timezone":1,"updated_time":"2014-08-07T08:15:04+0000","verified":true}';

        httpsMock.setResult(returnJson);
        FacebookService.__set__("https", httpsMock);

        // Act
        FacebookService.getUserDetails("9238745634098")
            .then(function(data) {
                test.equal(JSON.stringify(data), returnJson);
                test.done();
            })
            .done();
    },

    /**
     * Authenticate
     */
    testAuthenticate_CanAuthenticate: function(test) {
        // Arrange
        var returnJson = '{"id":"10154443099760434","email":"tomhalley89\u0040gmail.com","first_name":"Tom","gender":"male","last_name":"Halley","link":"https:\/\/www.facebook.com\/app_scoped_user_id\/10154443099760434\/","locale":"en_GB","name":"Tom Halley","timezone":1,"updated_time":"2014-08-07T08:15:04+0000","verified":true}';

        httpsMock.setResult(returnJson);
        FacebookService.__set__("https", httpsMock);
        FacebookService.__set__('UserRepository', UserRepositoryMock);
        FacebookService.__set__("SessionService", SessionServiceMock);

        // Act
        FacebookService.authenticate("26456370987", "43257098247")
            .then(function(sessionToken) {
                test.equal(sessionToken, "54690348560394865");
                test.done();
            })
            .done();
    }
};