var Database = require("../../common/Database"),
    User = require("../entities/User");

module.exports = {
    findUserById: function(id, callback) {
        Database.connect(function() {
            User.findOne({'id': id}, function(err, user) {
                Database.close();
                callback(err, user);
            });
        });
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