var sessionFixtures = require(process.env.PROJECT_PATH + "/test/fixtures/default/Sessions");

module.exports = {
    collection: {
        remove: function(callback) {
            callback();
        }
    },
    save: {

    },
    findOne: function(object, callback) {
        var userId = object['user_id'];

        for(var i = 0; i < sessionFixtures.length; i++) {
            if(sessionsFixtures[i]['user_id'] == userId) {
                callback(null, sessionsFixtures[i]);
            }
        }

        callback(new Error("Could not find user"));
    }
};