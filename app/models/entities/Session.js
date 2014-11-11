var mongoose = require("mongoose");

var SessionSchema = new mongoose.Schema({
    user_id: {type: String, required: true, unique: true},
    token: {type: String, required: true}
});

module.exports = mongoose.model("Session", SessionSchema);