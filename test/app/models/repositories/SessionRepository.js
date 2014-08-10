var SessionRepository = require("../../../../app/models/repositories/SessionRepository"),
    FixtureService = require("../../../../app/models/services/FixtureService"),
    Session = require("./../../../../app/models/entities/Session"),
    ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
    setUp: function(callback){
        FixtureService.loadFixtures("default", function() {
            callback();
        });
    },
    testSessionRepository_CanGetSessionByUserId: function(test) {
        var userObjectId = "230897461fh5";

        SessionRepository.findSessionByUserId(userObjectId, function(err, user) {
            test.equals(null, err);
            test.equals(userObjectId, user._id);
            test.done();
        });
    },
    testSessionRepository_CanCreateSession: function(test) {
        var userObjectId = "38gkmn891sd7";

        SessionRepository.createSessionFromUserId(userObjectId, function(err, session) {
            test.equals(err, null);
            test.equals(userObjectId, session.user_id);
            test.done();
        });
    }
};