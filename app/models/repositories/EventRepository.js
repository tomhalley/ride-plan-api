var Database = require("../../common/Database"),
    Event = require("../entities/Event"),
    User = require("../entities/User"),
    Q = require("q");

module.exports = {
    getEvents: function(count, page, callback) {
        Database.connect()
            .test(function() {
                Event.find({} , function(err, events) {
                    Database.close();
                    callback(err, events);
                })
                    .skip((page - 1) * count)
                    .limit(count);
            });
    },
    getEventById: function(id, callback) {
        Database.connect()
            .then(function() {
                Event.findOne({'id': id}, function(err, event) {
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
                    name: eventData.name,
                    //start_date_time: eventData,
                    //end_date_time: Date,
                    origin: eventData.origin,
                    destination: eventData.destination,
                    created_by: userId,
                    waypoints: eventData.waypoints,
                    avoidTolls: eventData.avoidTolls,
                    avoidHighways: eventData.avoidHighways
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