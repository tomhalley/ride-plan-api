var UserRepository = require("../repositories/UserRepository"),
    Config = require("../../common/ConfigProvider").getConfig(),
    SessionService = require("../services/SessionService"),
    https = require('https');

var appToken = null;

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
            path: "/oauth/access_token" +
            "?client_id=" + appId +
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

                    if (splitData.split("|")[0] != Config.facebook.app_id) {
                        console.error("Shit the bed!!! Man in the middle attack underway!!!");
                    }

                    appToken = splitData;
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
            method: "GET",
            path: "/debug_token" +
            "?input_token=" + accessToken +
            "&access_token=" + appToken
        };

        var err;
        var req = https.get(options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function(result) {
                result = JSON.parse(result);

                // If data contains error...
                if(result.error != undefined) {
                    console.error(result.error.message);
                    console.info(options);
                    callback(result.error.message, null);
                }

                if(result.data != undefined) {
                    if (result.data.app_id != Config.facebook.app_id) {
                        err = "What? The API responded with someone elses APP Id";
                        console.error(err);
                        console.info(options);
                        callback(err, null);
                    } else if (result.data.is_valid != true) {
                        err = "For some reason the response says the AccessToken is not valid :(";
                        console.error(err);
                        console.info(options);
                        callback(err, null)
                    } else {
                        callback(null, true);
                    }
                } else {
                    callback("No Data returned from API", null);
                }
            })
        });

        req.on('error', function(e) {
            console.error('problem with request: ' + e.message);
            callback(e, null);
        });
    },
    getUserDetails: function(accessToken, callback) {
        if(accessToken == null) {
            callback("AccessToken was null", null);
        }

        //2. Verify User Access Token
        var options = {
            host: "graph.facebook.com",
            port: 443,
            method: "GET",
            path: "/me" +
            "?access_token=" + accessToken
        };

        https.get(options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function(userData) {
                userData = JSON.parse(userData);
                callback(null, userData);
            });

            res.on('error', function(err) {
                callback(err, null);
            });
        });
    },
    authenticate: function(accessToken, fbUserId, callback) {
        //1. Verify Access Token
        self.getAppAccessToken(
            Config.facebook.app_id,
            Config.facebook.app_secret,
            function (err, appToken) {
                if (err) {
                    callback(err, null);
                }

                self.verifyAccessToken(appToken, accessToken, function (err, data) {
                    if (err) {
                        callback(err);
                    }

                    if (data != true) {
                        callback("Token was not valid", null);
                    }

                    UserRepository.findUserByFacebookId(fbUserId, function (err, user) {
                        if (err) {
                            // Return Error
                            callback(err);
                        } else if(user != null) {
                            // Return User
                            SessionService.sessionizeUser(user, function(err, session) {
                                if(err) {
                                    callback(err);
                                } else if (session == null) {
                                    callback("Unable to sessionize user");
                                } else {
                                    callback(null, session);
                                }
                            });
                        } else {
                            // Create New User

                            // 1. Get User Details
                            self.getUserDetails(accessToken, function(err, userData) {
                                if(err) {
                                    callback(err);
                                }

                                UserRepository.createUser(
                                    userData.id,
                                    userData.name,
                                    userData.email,
                                    function(err, user) {
                                        if(err) {
                                            callback(err);
                                        } else if(user == null) {
                                            callback("Could not create user");
                                        } else {
                                            SessionService.sessionizeUser(user, function(err, session) {
                                                if(err) {
                                                    callback(err);
                                                } else if (session == null) {
                                                    callback("Unable to sessionize user");
                                                } else {
                                                    callback(null, session);
                                                }
                                            });
                                        }
                                    }
                                );
                            });
                        }
                    });
                });
            }
        );
    }
};

module.exports = self;