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

        console.log("Creating session for user " + userId);

        var token = createSessionToken(userId);
        console.log("Created session token " + token);
        var session = new Session({
            user_id: userId,
            token: token
        });

        Database.connect(function() {
            session.save(function(err, session) {
                console.log(err);
                console.log(session);
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
        console.log("Finding session by user" + userId);

        Database.connect(function() {
            Session.findOne({user_id: userId}, function(err, session) {
                Database.close();
                callback(err, session);
            });
        });
    },
    findgetUserBySessionToken: function(sessionToken, callback) {
        Database.connect(function() {
            Session.findOne({token: sessionToken}, function(err, session) {
                Database.close();
                callback(err, session);
            });
        });
    }
};