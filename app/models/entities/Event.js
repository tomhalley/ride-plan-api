var mongoose = require("mongoose"),
    Mixed = mongoose.Schema.Types.Mixed;

var EventSchema = new mongoose.Schema({
    _id: String,
    name: String,
    origin: Mixed,
    waypoints: Array,
    destination: Mixed,
    start_time: Date,
    end_time: Date,
    avoid_tolls: Boolean,
    avoid_highways: Boolean,
    is_private: Boolean,
    created_by: mongoose.Schema.ObjectId,
    comments: Array,
    rsvps: Array
});

module.exports = mongoose.model('Event', EventSchema);