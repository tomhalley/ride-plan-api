var SessionRepository = require("../../../../app/models/repositories/SessionRepository"),
    FixtureService = require("../../../../app/models/services/FixtureService"),
    User = require("../../../../app/models/entities/User"),
    Database = require("../../../../app/common/Database"),
    ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
    setUp: function(callback){
        FixtureService.loadFixtures("default")
            .then(callback)
            .done();
    },
    testSessionRepository_CanGetSessionByUserId: function(test) {
        Database.connect()
            .then(function() {
                User.findOne({_id: new ObjectId("230897461fh5")}, function(err, user) {
                    Database.close();
                    SessionRepository.findSessionByUserId(user._id)
                        .then(function(session) {
                            test.equals(null, err);
                            test.equals(String(user._id), String(session.user_id));
                            test.done();
                        })
                        .done();
                });
            })
            .done();
    },
    testSessionRepository_CanCreateSession: function(test) {
        var userObjectId = new ObjectId("38gkmn891sd7");

        SessionRepository.createSessionFromUserId(userObjectId)
            .then(function(session) {
                test.equals(String(userObjectId), String(session.user_id));
                test.done();
            })
            .done();
    }
};