var ObjectId = require("mongoose").Types.ObjectId,
    SessionService = require(process.env.PROJECT_PATH + "/app/models/services/SessionService");

module.exports = {
    testSessionizeUser_CreatesSessionIfOneDoesntExist: function(test) {
        var user = {
            id: new ObjectId("230897461fh5")
        };

        SessionService.sessionizeUser(user)
            .then(function(session) {
                test.equals(String(session.user_id), String(new ObjectId("230897461fh5")));
                test.done();
            })
            .done();
    }
};