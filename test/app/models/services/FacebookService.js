var FacebookService = require("../../../../app/models/services/FacebookService"),
    Config = require("../../../../app/common/ConfigProvider").getConfig();

module.exports = {
    testGetAppAccessToken_ReturnsErrorIfAppIdNull: function(test) {
        FacebookService.getAppAccessToken(null, null, function(err, token) {
            test.notEqual(err, null);
            test.equal(token, null);
            test.done();
        })
    },
    testGetAppAccessToken_ReturnsErrorIfInvalidAppId: function(test) {
        FacebookService.getAppAccessToken(
            2309483201948,
            Config.facebook.app_secret,
            function(err, token) {
                test.notEqual(err, null);
                test.equal(token, null);
                test.done();
            }
        );
    },
    testGetAppAccessToken_ReturnsToken: function(test) {
        FacebookService.getAppAccessToken(
            Config.facebook.app_id,
            Config.facebook.app_secret,
            function(err, token) {
                test.equal(null, err);
                test.notEqual(null, token);
                test.done();
            }
        );
    },
};