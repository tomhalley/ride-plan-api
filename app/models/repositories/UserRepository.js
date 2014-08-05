var Database = require("../../common/Database"),
    User = require("../entities/User"),
    ObjectId = require("mongodb").ObjectID;

var validateUserData = function(userData) {

};

module.exports = {
    createUser: function(userData, callback) {

    },
    findUserByFacebookId: function(facebookId, callback) {
        Database.connect(function() {
            User.findOne({"facebook_id": facebookId}, function(err, user) {
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