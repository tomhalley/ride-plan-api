var mongoose = require("mongoose");

var Rsvp = new mongoose.Schema({
    user_id: mongoose.Schema.ObjectId,
    event_id: String,
    rsvp_bool: Number
});

module.exports = mongoose.model("Rsvp", Rsvp);