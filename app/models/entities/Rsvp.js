var mongoose = require("mongoose");

var Rsvp = new mongoose.Schema({
    user_id: String,
    event_id: String,
    rsvp_bool: Number
});

Rsvp.index({user_id: 1, event_id: 1}, {unique: true});

module.exports = mongoose.model("Rsvp", Rsvp);