var mongoose = require("mongoose"),
    ObjectId = mongoose.Schema.ObjectId;

var UserSchema = new mongoose.Schema({
    __v: {type: Number, select: false},
    facebook_id: {type: Number, unique: true},
    name: {type:  String},
    email: {type: String, unique: true}
});

module.exports = mongoose.model('User', UserSchema);