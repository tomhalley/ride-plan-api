var SessionRepository = require("../repositories/SessionRepository");

module.exports = {
    sessionizeUser: function(user) {
        if(user == undefined) {
            throw new Error("Parameter 'user' was undefined.");
        }

        return SessionRepository.findSessionByUserId(user.id)
        .then(function(session) {
            if (session == null) {
                return SessionRepository.createSessionFromUserId(user.id);
            } else {
                return session;
            }
        });
    }
};