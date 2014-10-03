"use strict";

var Database = require("../../common/Database"),
    User = require("../entities/User"),
    Q = require("q");

module.exports = {
    createUser: function(fbId, name, email) {
        var deferred = Q.defer();

        if(fbId === null || fbId === undefined) {
            deferred.reject(new Error("Parameter 'fbId' was undefined"));
        } else if (name === null || name === undefined) {
            deferred.reject(new Error("Parameter 'name' was undefined"));
        } else if (email === null || email === undefined) {
            deferred.reject(new Error("Parameter 'email' was undefined"));
        } else {
            Database.connect()
                .then(function() {
                    var user = new User({
                        facebook_id: fbId,
                        name: name,
                        email: email
                    });

                    user.save(function(err, user) {
                        Database.close();

                        if(err) {
                            deferred.reject(err);
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
            deferred.reject(new Error("Parameter 'userId' was undefined"));
        } else {
            Database.connect()
                .then(function() {
                    User.findOne({_id: userId}, function(err, user) {
                        Database.close();

                        if(err) {
                            deferred.reject(err);
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
            deferred.reject(new Error("Parameter 'facebookId' was undefined"));
        } else {
            Database.connect()
                .then(function() {
                    User.findOne({"facebook_id": facebookId}, function (err, user) {
                        Database.close();

                        if(err) {
                            deferred.reject(err);
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
            deferred.reject(new Error("Parameter 'email' was undefined"));
        } else {
            Database.connect().
                then(function() {
                    User.findOne({'email': email}, function(err, user) {
                        Database.close();

                        if(err) {
                            deferred.reject(err);
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