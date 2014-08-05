var mongoose = require("mongoose");

var SessionSchema = new mongoose.Schema({
    _id: {select: false},
    __v: {type: Number, select: false},
    user_id: { type: Number, unique: true},
    session_token: { type: String },
    facebook_user_id: { type: Number, unique: true },
    facebook_long_lived_token: { type: Number }
});

module.exports = mongoose.model("Session", SessionSchema);