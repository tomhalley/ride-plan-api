var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    _id: {type: String, select: false},
    __v: {type: Number, select: false},
    id: Number,
    name: {type:  String, unique: true},
    email: String
});

module.exports = mongoose.model('User', UserSchema);