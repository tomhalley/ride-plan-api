var mongoose = require("mongoose");

var EventSchema = new mongoose.Schema({
    name: String,
    start_date_time: Date,
    end_date_time: Date,
    origin: String,
    destination: String,
    created_by: mongoose.Schema.ObjectId,
    waypoints: Array,
    avoidTolls: Boolean,
    avoidHighways: Boolean,
    comments: Array
});

module.exports = mongoose.model('Event', EventSchema);