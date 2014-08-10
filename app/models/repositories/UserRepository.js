var Database = require("../../common/Database"),
    User = require("../entities/User");

module.exports = {
    createUser: function(fbId, name, email, callback) {
        Database.connect(function() {
            var user = new User({
                facebook_id: fbId,
                name: name,
                email: email
            });

            user.save(function(err, user) {
                if(err || user == undefined) {
                    callback("Unable to save user " + err);
                }

                Database.close();
                callback(err, user);
            });
        })
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