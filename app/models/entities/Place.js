var mongoose = require("mongoose");

var PlaceSchema = new mongoose.Schema({
    _id: {select: false},
    __v: {type: Number, select: false},
    place_id: Number,
    name: String,
    coords: String,
    last_updated_at: Date
});

module.exports = mongoose.model("Place", PlaceSchema);