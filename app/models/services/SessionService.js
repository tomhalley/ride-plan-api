var SessionRepository = require("../repositories/SessionRepository")
    Q = require("q");

module.exports = {
    sessionizeUser: function(user) {
        var deferred = Q.defer();

        if(user == undefined) {
            throw new Error("Parameter 'user' was undefined.");
        }

        SessionRepository.findSessionByUserId(user.id)
            .then(function(session) {
                if (session === null) {
                    SessionRepository.createSessionFromUserId(user.id)
                        .then(function(session) {
                            if(session) {
                                deferred.resolve(session);
                            } else {
                                deferred.reject(new Error("Could not create session token for user"));
                            }
                        })
                        .done();

                } else {
                    deferred.resolve(session);
                }
            })
            .done();

        return deferred.promise;
    }
};