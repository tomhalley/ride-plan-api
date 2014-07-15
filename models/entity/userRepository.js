var database = require("../common/database"),
    mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var UserModel = mongoose.model('user', new Schema({
    id: String,
    name: String,
    email: String
}));

module.exports = {
    findUserById: function(id, callback) {
        database.connect(function() {
            UserModel.find({}, function(err, user) {
                console.log(user);
                callback(user);
            });
        });
    }
};