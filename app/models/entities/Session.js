var mongoose = require("mongoose"),
    ObjectId = mongoose.Schema.ObjectId;

var SessionSchema = new mongoose.Schema({
    __v: {select: false},
    user_id: { type: ObjectId, unique: true},
    token: { type: String, unique: true }
});

module.exports = mongoose.model("Session", SessionSchema);