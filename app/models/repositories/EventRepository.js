var Database = require("../../common/Database"),
    Event = require("../entities/Event"),
    User = require("../entities/User"),
    Q = require("q"),
    crc = require("crc");

var createEventHash = function(eventData) {
    return crc.crc32(JSON.stringify(eventData));
};

module.exports = {
    getEvents: function(callback) {
        Database.connect()
            .then(function() {
                var query = Event.find({}).select({
                    _id: 1,
                    name: 1,
                    origin: 1,
                    destination: 1,
                    waypoints: 1
                });

                query.exec(function(err, events) {
                    Database.close();
                    callback(err, events);
                })
            });
    },
    getEventById: function(id, callback) {
        Database.connect()
            .then(function() {
                Event.findOne({'_id': id}, function(err, event) {
                    Database.close();
                    callback(err, event);
                });
            });
    },
    createEvent: function(eventData, userId) {
        var deferred = Q.defer();

        Database.connect()
            .then(function() {
                var event = new Event({
                    _id: createEventHash(eventData),
                    name: eventData.name,
                    origin: eventData.origin,
                    waypoints: eventData.waypoints,
                    destination: eventData.destination,
                    start_time: eventData.start_time,
                    end_time: eventData.end_time,
                    avoid_tolls: eventData.avoid_tolls,
                    avoid_highways: eventData.avoid_highways,
                    is_private: eventData.is_private,
                    created_by: userId
                });

                event.save(function(err, event) {
                    Database.close();

                    if(err) {
                        deferred.reject(new Error(err));
                    } else {
                        deferred.resolve(event);
                    }
                });
            })
            .done();

        return deferred.promise;
    }
};