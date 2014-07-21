var Database = require("../../common/Database"),
    Event = require("../entities/Event");

module.exports = {
    getEvents: function(count, page, callback) {
        Database.connect(function() {
            Event.find({} , function(err, events) {
                Database.close();
                callback(err, events);
            })
                .skip((page - 1) * count)
                .limit(count);
        })
    },
    getEventById: function(id, callback) {
        Database.connect(function() {
            Event.findOne({'id': id}, function(err, event) {
                Database.close();
                callback(err, event);
            });
        })
    }
};