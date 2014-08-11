var Database = require("../../common/Database"),
    Session = require("../entities/Session"),
    Crypto = require('crypto'),
    Q = require("q");

var createSessionToken = function(userId) {
    var sha = Crypto.createHash('sha256');
    var timeStamp = (new Date).getTime();
    sha.update(userId + timeStamp);
    return sha.digest('hex');
};

module.exports = {
    /**
     * Create session object in Database for user
     *
     * @param userId ObjectId
     */
    createSessionFromUserId: function(userId) {
        var deferred = Q.defer();

        if(userId == undefined) {
            deferred.reject(new Error("Parameter 'userId' is undefined"));
        }

        Database.connect()
            .then(function() {
                return new Session({
                    user_id: userId,
                    token: createSessionToken(userId)
                });
            })
            .then(function(session) {
                session.save(function(err, session) {
                    Database.close();

                    if(err) {
                        deferred.reject(new Error(err));
                    } else {
                        deferred.resolve(session);
                    }
                });
            })
            .done();

        return deferred.promise;
    },

    /**
     * Find session object for a user if it exists
     *
     * @param userId ObjectId
     */
    findSessionByUserId: function(userId) {
        var deferred = Q.defer();

        Database.connect()
            .then(function() {
                Session.findOne({user_id: userId}, function (err, session) {
                    Database.close();

                    if(err) {
                        deferred.reject(new Error(err));
                    } else {
                        deferred.resolve(session);
                    }
                });
            })
            .done();

        return deferred.promise;
    },

    /**
     * Find UserId by SessionToken
     *
     * @param sessionToken
     */
    findgetUserBySessionToken: function(sessionToken) {
        var deferred = Q.defer();

        Database.connect()
            .then(function() {
                Session.findOne({token: sessionToken}, function (err, session) {
                    Database.close();

                    if (err) {
                        deferred.reject(new Error(err));
                    } else {
                        deferred.resolve(session);
                    }
                });
            })
            .done();

        return deferred.promise;
    }
};