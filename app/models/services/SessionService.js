var SessionRepository = require("../repositories/SessionRepository");

module.exports = {
    sessionizeUser: function(user, callback) {
        SessionRepository.findSessionByUserId(user._id, function(err, session) {
            if(err) {
                callback(err, null);
            } else if (session === null) {
                SessionRepository.createSessionFromUserId(user._id, function(err, session) {
                    if(err) {
                        callback(err, null)
                    } else if (session === null) {
                        callback("Could not create session token for user", null);
                    } else {
                        callback(null, session);
                    }
                })
            } else {
                callback(session);
            }
        })
    }
};