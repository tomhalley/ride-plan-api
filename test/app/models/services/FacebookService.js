var rewire = require("rewire"),
    FacebookService = rewire(process.env.PROJECT_PATH + "/app/models/services/FacebookService"),
    httpsMock = require(process.env.PROJECT_PATH + "/test/mocks/https");

module.exports = {
    testFacebookServiceExists: function(test) {
        test.notEqual(FacebookService, null);
        test.done();
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
    }

};