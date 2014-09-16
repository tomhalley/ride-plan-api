var mockery = require("mockery");

var User = {

};


var ObjectId = require("mongoose").Types.ObjectId;

var users = [
    {
        _id: new ObjectId("230897461fh5"),
        facebook_id: 76354369436,
        name: "Tom Halley",
        email: "tomhalley89@gmail.com"
    },
    {
        _id: new ObjectId("302198471209"),
        facebook_id: 3542654231,
        name: "John Smith",
        email: "john.smith@bt.net"
    }
];