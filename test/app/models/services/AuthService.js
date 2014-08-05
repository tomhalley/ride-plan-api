var AuthService = require("../../../../app/models/services/AuthService"),
    Config = require("../../../../app/common/ConfigProvider").getConfig();

module.exports = {
    testGetAppAccessToken_ReturnsErrorIfAppIdNull: function(test) {
        AuthService.getAppAccessToken(null, null, function(err, token) {
            test.notEqual(err, null);
            test.equal(token, null);
            test.done();
        })
    },
    testGetAppAccessToken_ReturnsErrorIfInvalidAppId: function(test) {
        AuthService.getAppAccessToken(
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
        AuthService.getAppAccessToken(
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