"use strict";

var Errors = require("../../common/Errors"),
    Database = require("../../common/Database"),
    User = require("../entities/User"),
    Config = require("../../common/ConfigProvider").getConfig(),
    crc = require('crc'),
    Q = require("q");

var createUserId = function(email) {
    return crc.crc32(email + Config.app.user_id_salt);
};

module.exports = {
    createUser: function(fbId, name, email) {
        var deferred = Q.defer();

        if(fbId === null || fbId === undefined) {
            deferred.reject(new Errors.AppError("Parameter 'fbId' was undefined"));
        } else if (name === null || name === undefined) {
            deferred.reject(new Errors.AppError("Parameter 'name' was undefined"));
        } else if (email === null || email === undefined) {
            deferred.reject(new Errors.AppError("Parameter 'email' was undefined"));
        } else {
            Database.connect()
                .then(function() {
                    var user = new User({
                        _id: createUserId(email),
                        facebook_id: fbId,
                        name: name,
                        email: email
                    });

                    user.save(function(err, user) {
                        Database.close();

                        if(err) {
                            deferred.reject(new Errors.AppError(err.message));
                        } else {
                            deferred.resolve(user);
                        }
                    });
                })
                .done();
        }

        return deferred.promise;
    },
    findUserById: function(userId) {
        var deferred = Q.defer();

        if(userId === null || userId === undefined) {
            deferred.reject(new Errors.AppError("Parameter 'userId' was undefined"));
        } else {
            Database.connect()
                .then(function() {
                    User.findOne({_id: userId}, function(err, user) {
                        Database.close();

                        if(err) {
                            deferred.reject(new Errors.AppError(err.message));
                        } else {
                            deferred.resolve(user);
                        }
                    });
                })
                .done();
        }

        return deferred.promise;
    },
    findUserByFacebookId: function(facebookId) {
        var deferred = Q.defer();

        if(facebookId === null || facebookId === undefined) {
            deferred.reject(new Errors.AppError("Parameter 'facebookId' was undefined"));
        } else {
            Database.connect()
                .then(function() {
                    User.findOne({"facebook_id": facebookId})
                        .select({_id: 1, name: 1})
                        .exec(function (err, user) {
                            Database.close();

                            if(err) {
                                deferred.reject(new Errors.AppError(err.message));
                            } else {
                                deferred.resolve(user);
                            }
                        });
                    })
                    .done();
        }

        return deferred.promise;
    },
    findUserByEmail: function(email) {
        var deferred = Q.defer();

        if(email === null || email === undefined) {
            deferred.reject(new Errors.AppError("Parameter 'email' was undefined"));
        } else {
            Database.connect().
                then(function() {
                    User.findOne({'email': email}, function(err, user) {
                        Database.close();

                        if(err) {
                            deferred.reject(new Errors.AppError(err.message));
                        } else {
                            deferred.resolve(user);
                        }
                    });
                })
                .done();
        }

        return deferred.promise;
    }
};