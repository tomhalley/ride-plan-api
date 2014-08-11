var Database = require("../../common/Database"),
    User = require("../entities/User"),
    Q = require("q");

module.exports = {
    createUser: function(fbId, name, email) {
        var deferred = Q.defer();

        Database.connect()
            .then(function() {
                var user = new User({
                    facebook_id: fbId,
                    name: name,
                    email: email
                });

                user.save(function(err, user) {
                    Database.close();

                    if(err || user == undefined) {
                        deferred.reject(new Error("Unable to save user"));
                    } else {
                        deferred.resolve(user);
                    }
                });
            })
            .done();

        return deferred.promise;
    },
    findUserByFacebookId: function(facebookId) {
        var deferred = Q.defer();

        Database.connect()
            .then(function() {
                User.findOne({"facebook_id": facebookId}, function (err, user) {
                    Database.close();

                    if(err) {
                        deferred.reject(new Error(err));
                    } else {
                        deferred.resolve(user);
                    }
                });
            })
            .done();

        return deferred.promise;
    },
    findUserByEmail: function(email) {
        var deferred = Q.defer();

        Database.connect().
            then(function() {
                User.findOne({'email': email}, function(err, user) {
                    Database.close();

                    if(err) {
                        deferred.reject(new Error(err));
                    } else {
                        deferred.resolve(user);
                    }
                });
            })
            .done();

        return deferred.promise;
    }
};