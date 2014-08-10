var mongoose = require("mongoose"),
    ObjectId = mongoose.Schema.ObjectId;

var SessionSchema = new mongoose.Schema({
    _id: {select: false},
    __v: {type: Number, select: false},
    user_id: { type: ObjectId, unique: true},
    token: { type: String, unique: true }
});

module.exports = mongoose.model("Session", SessionSchema);