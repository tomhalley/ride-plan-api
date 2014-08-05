var UserRepository = require("../repositories/UserRepository"),
    Config = require("../../common/ConfigProvider").getConfig(),
    https = require('https');

var appToken;

var createSessionToken = function(accessToken, fbUserId) {
    return "sd09fusdfpfjawa48f9j";
};

module.exports = {
    verifyAccessToken: function(accessToken, callback) {
        //1. Get App Access Token
        //2. Verify User Access Token

        var options = {
            host: "graph.facebook.com",
            port: 80,
            path: "/debug_token?input_token=" + accessToken + "&access_token=" + appToken,
            method: "GET"
        };
    },
    getAppAccessToken: function(appId, appSecret, callback) {

        if(appId == null || appSecret == null) {
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

        var req = https.get(options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (data) {
                try {
                    data = JSON.parse(data);
                    callback(data.error, null);
                } catch(e) {
                    var splitData = data.split("=")[1];
                    var resultParts = splitData.split("|");

                    if(resultParts[0] != Config.facebook.app_id) {
                        console.error("Shit the bed!!! Man in the middle attack underway!!!");
                    }

                    callback(null, resultParts[1]);
                }
            });
        });

        req.on('error', function(e) {
            console.error('problem with request: ' + e.message);
            callback(e, null);
        });
    },
    authenticate: function(accessToken, fbUserId, callback) {
        //1. Verify Access Token
        //2. Check if user exists in database
        //2.1. If not, get user details from facebook and create user, then return

        // Get user if he exists from database
        UserRepository.findUserByFacebookId(fbUserId, function(err, user) {
            if(err) {
                callback(err);
            } else {

            }
        });
    }
};