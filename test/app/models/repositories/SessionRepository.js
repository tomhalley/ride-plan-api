var SessionRepository = require("../../../../app/models/repositories/SessionRepository"),
    FixtureService = require("../../../../app/models/services/FixtureService"),
    User = require("./../../../../app/models/entities/User"),
    ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
    setUp: function(callback){
        FixtureService.loadFixtures("default", function() {
            callback();
        });
    },
    testSessionRepository_CanGetSessionByUserId: function(test) {
        User.findOne({user_id: new ObjectId("230897461fh5")}, function(err, user) {
            SessionRepository.findSessionByUserId(user._id, function(err, user) {
                test.equals(null, err);
                test.equals(new ObjectId("230897461fh5"), user._id);
                test.done();
            });
        });
    },
    testSessionRepository_CanCreateSession: function(test) {
        SessionRepository.createSessionFromUserId(new ObjectId("38gkmn891sd7"), function(err, session) {
            test.equals(err, null);
            test.equals(new ObjectId("38gkmn891sd7"), session.user_id);
            test.done();
        });
    }
};