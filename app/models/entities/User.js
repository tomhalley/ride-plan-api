var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    _id: {type: Number, select: false},
    __v: {type: Number, select: false},
    facebook_id: {type: Number, unique: true},
    name: {type:  String, unique: true},
    email: String
});

module.exports = mongoose.model('User', UserSchema);