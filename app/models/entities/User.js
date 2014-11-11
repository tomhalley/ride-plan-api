var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    facebook_id: {type: Number, unique: true},
    name: {type:  String},
    email: {type: String, unique: true}
});

module.exports = mongoose.model('User', UserSchema);