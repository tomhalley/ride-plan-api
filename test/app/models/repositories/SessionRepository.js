var SessionRepository = require("../../../../app/models/repositories/SessionRepository"),
    FixtureService = require("../../../../app/models/services/FixtureService"),
    User = require("../../../../app/models/entities/User"),
    Database = require("../../../../app/common/Database"),
    ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
    setUp: function(callback){
        FixtureService.loadFixtures("default", function() {
            callback();
        });
    },
    testSessionRepository_CanGetSessionByUserId: function(test) {
        Database.connect(function() {
            User.findOne({_id: new ObjectId("230897461fh5")}, function(err, user) {
                Database.close();
                SessionRepository.findSessionByUserId(user._id, function(err, session) {
                    test.equals(null, err);
                    test.equals(String(user._id), String(session.user_id));
                    test.done();
                });
            });
        })
    },
    testSessionRepository_CanCreateSession: function(test) {
        var userObjectId = new ObjectId("38gkmn891sd7");

        SessionRepository.createSessionFromUserId(userObjectId, function(err, session) {
            test.equals(err, null);
            test.equals(String(userObjectId), String(session.user_id));
            test.done();
        });
    }
};