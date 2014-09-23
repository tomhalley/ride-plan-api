var Database = require("../../common/Database"),
    Event = require("../entities/Event"),
    User = require("../entities/User"),
    Q = require("q"),
    crc = require("crc");

var createEventHash = function(eventData) {
    return crc.crc32(JSON.stringify(eventData));
};

module.exports = {
    /**
     * Retrieves a list of all events
     *
     * @returns {adapter.deferred.promise|*|defer.promise|promise.promise|jQuery.promise|promise}
     */
    getEvents: function() {
        var deferred = Q.defer();

        Database.connect()
            .then(function() {
                Event.find({}).select({
                    _id: 1,
                    name: 1,
                    origin: 1,
                    destination: 1,
                    waypoints: 1
                })
                .exec(function(err, events) {
                    Database.close();

                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(events);
                    }
                })
            })
            .done();

        return deferred.promise;
    },
    /**
     * Retrieves an event by eventId
     *
     * @param eventId
     * @returns {adapter.deferred.promise|*|defer.promise|promise.promise|jQuery.promise|promise}
     */
    getEventById: function(eventId) {
        var deferred = Q.defer();

        if(eventId == null || eventId == undefined) {
            deferred.reject(new Error("EventId cannot be null"));
        }

        Database.connect()
            .then(function() {
                Event.findOne({'_id': eventId}, function(err, event) {
                    Database.close();

                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(event);
                    }
                });
            });

        return deferred.promise;
    },
    /**
     * Saves an event in the database
     *
     * @param eventData
     * @param userId
     * @returns {adapter.deferred.promise|*|defer.promise|promise.promise|jQuery.promise|promise}
     */
    createEvent: function(eventData, userId) {
        var deferred = Q.defer();

        if(eventData == null || eventData == undefined) {
            deferred.reject(new Error("Parameter 'eventData' is undefined"));
        } else if (userId == null || userId == undefined) {
            deferred.reject(new Error("Parameter 'userId' is undefined"));
        } else {
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
                            deferred.reject(err);
                        } else {
                            deferred.resolve(event);
                        }
                    });
                })
                .done();
        }



        return deferred.promise;
    }
};