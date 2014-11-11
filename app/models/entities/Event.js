var mongoose = require("mongoose"),
    Mixed = mongoose.Schema.Types.Mixed;

var EventSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    name: {type: String, required: true},
    origin: {type: Mixed, required: true},
    waypoints: Array,
    destination: {type: Mixed, required: true},
    start_time: {type: Date, required: true},
    end_time: {type: Date, required: true},
    avoid_tolls: {type: Boolean, default: false},
    avoid_highways: {type: Boolean, default: false},
    is_private: {type: Boolean, default: false},
    created_by: {type: String, required: true},
    comments: Array
});

module.exports = mongoose.model('Event', EventSchema);