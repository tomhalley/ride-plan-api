var mongoose = require("mongoose");

var SessionSchema = new mongoose.Schema({
    user_id: mongoose.Schema.ObjectId,
    token: String
});

module.exports = mongoose.model("Session", SessionSchema);