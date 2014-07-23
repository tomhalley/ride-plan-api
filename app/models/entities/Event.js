var mongoose = require("mongoose"),
    User = require("../entities/User");

var EventSchema = new mongoose.Schema({
    _id: String,
    __v: {type: Number, select: false},
    name: String,
    start_date_time: Date,
    end_date_time: Date,
    created_by: Number,
    waypoints: Array,
    comments: Array
});

module.exports = mongoose.model('Event', EventSchema);