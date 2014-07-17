var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    _id: {type: String, select: false},
    __v: {type: Number, select: false},
    id: Number,
    name: String,
    email: String
}));