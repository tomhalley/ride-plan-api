var SessionService = require("../../../../app/models/services/SessionService"),
    Database = require("../../../../app/common/Database"),
    FixtureService = require("../../../../app/models/services/FixtureService"),
    User = require("../../../../app/models/entities/User"),
    Session = require("../../../../app/models/entities/Session"),
    ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
    setUp: function(callback) {
        FixtureService.loadFixtures("default")
            .then(callback)
            .done();
    },
    testSessionizeUser_CreatesSessionIfOneDoesntExist: function(test) {
        Database.connect()
            .then(function() {
                Session.collection.remove(function() {
                    User.findOne({_id: new ObjectId("230897461fh5")}, function(err, user) {

                        SessionService.sessionizeUser(user)
                            .then(function(session) {
                                test.equals(String(session.user_id), String(new ObjectId("230897461fh5")));
                            })
                            .done();
                    });
                });
            })
            .done(function() {
                Database.close();
                console.log("Connection is now closed");
                test.done();
            });
    },
    //testSessionizeUser_ReturnsSessionIfOneExists: function(test) {
    //    Database.connect()
    //        .then(function() {
    //            User.findOne({_id: new ObjectId("230897461fh5")}, function(err, user) {
    //                Database.close();
    //                SessionService.sessionizeUser(user).then(function(session) {
    //                    test.equals(err, null);
    //                    test.equals(String(session.user_id), String(new ObjectId("230897461fh5")));
    //                })
    //            });
    //        })
    //        .done(function() {
    //            test.done();
    //        })
    //}
};