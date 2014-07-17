var database = require("../common/database"),
    User = require("../models/user");

module.exports = {
    findUserById: function(id, callback) {
        database.connect(function() {
            User.findOne({'id': id}, function(err, user) {
                database.close();
                callback(err, user);
            });
        });
    },
    findUserByEmail: function(email, callback) {
        database.connect(function() {
            User.findOne({'email': email}, function(err, user) {
                database.close();
                callback(err, user);
            });
        });
    }
};