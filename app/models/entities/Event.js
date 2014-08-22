var mongoose = require("mongoose");

var EventSchema = new mongoose.Schema({
    _id: String,
    name: String,
    origin: String,
    waypoints: Array,
    destination: String,
    start_time: Date,
    end_time: Date,
    avoid_tolls: Boolean,
    avoid_highways: Boolean,
    is_private: Boolean,
    created_by: mongoose.Schema.ObjectId,
    comments: Array
});

module.exports = mongoose.model('Event', EventSchema);