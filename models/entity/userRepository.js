var database = require("../common/database"),
    mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var UserModel = mongoose.model('User', new Schema({
    _id: {type: String, select: false},
    id: Number,
    name: String,
    email: String,
    __v: {type: Number, select: false}
}));

module.exports = {
    findUserById: function(id, callback) {
        database.connect(function() {
            UserModel.findOne({'id': id}, function(err, user) {
                database.close();
                callback(user);
            });
        });
    },
    findUserByEmail: function(email, callback) {
        database.connect(function() {
            UserModel.findOne({'email': email}, function(err, user) {
                database.close();
                callback(user);
            });
        });
    }
};