var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    _id: {type: String, select: false},
    __v: {type: Number, select: false},
    id: Number,
    name: String,
    email: String
});
UserSchema.set("redisCache", true);
UserSchema.set("expires", 3000);

module.exports = mongoose.model('User', UserSchema);