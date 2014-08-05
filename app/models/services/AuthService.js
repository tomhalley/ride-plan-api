var UserRepository = require("../repositories/UserRepository"),
    Config = require("../../common/ConfigProvider").getConfig(),
    https = require('https');

var appToken = null;

var createSessionToken = function(accessToken, fbUserId) {
    return "sd09fusdfpfjawa48f9j";
};

var self = {
    getAppAccessToken: function(appId, appSecret, callback) {
        if (appToken != null) {
            callback(null, appToken);
        }

        if (appId == null || appSecret == null) {
            callback("AppID or AppSecret not parsed into parameters", null);
        }

        var options = {
            host: "graph.facebook.com",
            port: 443,
            path: "/oauth/access_token?" +
            "client_id=" + appId +
            "&client_secret=" + appSecret +
            "&grant_type=client_credentials"
        };

        var req = https.get(options, function (res) {
            res.setEncoding('utf8');
            res.on('data', function (data) {
                try {
                    data = JSON.parse(data);
                    callback(data.error, null);
                } catch (e) {
                    var splitData = data.split("=")[1];
                    var resultParts = splitData.split("|");

                    if (resultParts[0] != Config.facebook.app_id) {
                        console.error("Shit the bed!!! Man in the middle attack underway!!!");
                    }

                    appToken = resultParts[1];
                    callback(null, appToken);
                }
            });
        });

        req.on('error', function (e) {
            console.error('problem with request: ' + e.message);
            callback(e, null);
        })
    },
    verifyAccessToken: function(appToken, accessToken, callback) {
        //1. Get App Access Token
        if(appToken == null) {
            callback("App Access Token not retrieved yet", null);
        }

        //2. Verify User Access Token

        var options = {
            host: "graph.facebook.com",
            port: 443,
            path: "/debug_token?input_token=" + accessToken + "&access_token=" + appToken,
            method: "GET"
        };

        var err;
        var req = https.get(options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function(result) {
                result = JSON.parse(result);

                if(result.error != undefined) {
                    console.error(result.error.message);
                    callback(result.error.message, null);
                }

                if(result.data.app_id != Config.facebook.app_id) {
                    err = "What? The API responded with someone elses APP Id";
                    console.error(err);
                    callback(err, null);
                }

                if(result.data.is_valid != true) {
                    err = "For some reason the response says the AccessToken is not valid :(";
                    console.error(err);
                    callback(err, null)
                }

                callback(null, result);
            })
        });

        req.on('error', function(e) {
            console.error('problem with request: ' + e.message);
            callback(e, null);
        });
    },
    authenticate: function(accessToken, fbUserId, callback) {
        //1. Verify Access Token
        self.getAppAccessToken(
            Config.facebook.app_id,
            Config.facebook.app_secret,
            function(err, appToken) {
                if(err) {
                    callback(err, null);
                }

                self.verifyAccessToken(appToken, accessToken, function(err, tokenData) {
                    if(err) {
                        callback(err, null);
                    }

                    callback(null, tokenData);
                });
            }
        );


        //2. Check if user exists in database
        //2.1. If not, get user details from facebook and create user, then return

        // Get user if he exists from database
//        UserRepository.findUserByFacebookId(fbUserId, function(err, user) {
//            if(err) {
//                callback(err);
//            } else {
//
//            }
//        });
    }
};

module.exports = self;