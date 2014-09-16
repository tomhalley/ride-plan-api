var Mockery = require("mockery"),
    SessionService = require(process.env.PROJECT_PATH + "/app/models/services/SessionService"),
    ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
    setUp: function(callback) {
        Mockery.enable();

        // Register Mocks
        Mockery.registerSubstitute(
            process.env.PROJECT_PATH + "/app/common/Database",
            process.env.PROJECT_PATH + "/test/mocks/common/Database"
        );

        Mockery.registerSubstitute(
            process.env.PROJECT_PATH + "/app/models/entities/Session",
            process.env.PROJECT_PATH + "/test/mocks/models/entities/Session"
        );

        callback();
    },
    tearDown: function(callback) {
        Mockery.disable();

        // Deregister Mocks
        Mockery.deregisterSubstitute(process.env.PROJECT_PATH + "/app/common/Database");
        Mockery.deregisterSubstitute(process.env.PROJECT_PATH + "/app/models/entities/Session");

        callback();
    },
    testSessionizeUser_CreatesSessionIfOneDoesntExist: function(test) {

        var user = {
            id: new ObjectId("230897461fh5")
        };

        SessionService.sessionizeUser(user)
            .then(function(session) {
                test.equals(String(session.user_id), String(new ObjectId("230897461fh5")));
            })
            .done(function() {
                test.done();
            });
    }
};