var Database = require("../../common/Database"),
    Session = require("../entities/Session"),
    Crypto = require('crypto');

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
     * @param callback function
     */
    createSessionFromUserId: function(userId, callback) {
        var token = createSessionToken(userId);
        var session = new Session({
            user_id: userId,
            token: token
        });

        Database.connect(function() {
            session.save(function(err, session) {
                Database.close();
                callback(err, session);
            });
        })
    },

    /**
     * Find session object for a user if it exists
     *
     * @param userId ObjectId
     * @param callback function
     */
    findSessionByUserId: function(userId, callback) {
        Database.connect(function() {
            Session.findOne({user_id: userId}, function(err, session) {
                Database.close();
                callback(err, session);
            });
        });
    },

    /**
     * Find UserId by SessionToken
     *
     * @param sessionToken
     * @param callback
     */
    findgetUserBySessionToken: function(sessionToken, callback) {
        Database.connect(function() {
            Session.findOne({token: sessionToken}, function(err, session) {
                Database.close();
                callback(err, session);
            });
        });
    }
};