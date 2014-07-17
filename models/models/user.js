var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    _id: {type: String, select: false},
    id: Number,
    name: String,
    email: String,
    __v: {type: Number, select: false}
}));