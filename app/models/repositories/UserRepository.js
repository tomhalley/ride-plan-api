var Database = require("../../common/Database"),
    User = require("../entities/User"),
    ObjectId = require("mongodb").ObjectID;

module.exports = {

    findUserByUsername: function(username, callback) {
        Database.connect
    },
    findUserByEmail: function(email, callback) {
        Database.connect(function() {
            User.findOne({'email': email}, function(err, user) {
                Database.close();
                callback(err, user);
            });
        });
    }
};