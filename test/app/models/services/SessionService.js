var rewire = require("rewire"),
    ObjectId = require("mongoose").Types.ObjectId,
    SessionService = rewire(process.env.PROJECT_PATH + "/app/models/services/SessionService"),
    SessionRepositoryMock = require("../../../mocks/models/repositories/SessionRepository");

module.exports = {
    testSessionizeUser_CreatesSessionIfOneDoesntExist: function(test) {
        SessionService.__set__("SessionRepository", SessionRepositoryMock);

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