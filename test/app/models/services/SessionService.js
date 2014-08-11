var SessionService = require("../../../../app/models/services/SessionService"),
    Database = require("../../../../app/common/Database"),
    FixtureService = require("../../../../app/models/services/FixtureService"),
    User = require("../../../../app/models/entities/User"),
    Session = require("../../../../app/models/entities/Session"),
    ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
    setUp: function(callback) {
        FixtureService.loadFixtures("default", function() {
            callback();
        })
    },
    testSessionizeUser_CreatesSessionIfOneDoesntExist: function(test) {
        Database.connect(function() {
            Session.collection.remove(function() {
                User.findOne({_id: new ObjectId("230897461fh5")}, function(err, user) {
                    Database.close();
                    SessionService.sessionizeUser(user, function(err, session) {
                        test.equals(err, null);
                        test.equals(String(session.user_id), String(new ObjectId("230897461fh5")));
                        test.done();
                    });
                });
            });
        });
    },
    //testSessionizeUser_ReturnsSessionIfOneExists: function(test) {
    //    Database.connect(function() {
    //        User.findOne({_id: new ObjectId("230897461fh5")}, function(err, user) {
    //            Database.close();
    //            SessionService.sessionizeUser(user, function(err, session) {
    //                test.equals(err, null);
    //                test.equals(String(session.user_id), String(new ObjectId("230897461fh5")));
    //                test.done();
    //            })
    //        });
    //    });
    //}
};