"use strict";

var Database = require("../../common/Database"),
    Event = require("../entities/Event"),
    User = require("../entities/User"),
    Q = require("q"),
    crc = require("crc");

var createEventHash = function(eventData) {
    return crc.crc32(JSON.stringify(eventData));
};

var self = {
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
                });
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

        if(eventId === null || eventId === undefined) {
            deferred.reject(new Error("EventId cannot be null"));
        } else {
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
        }

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

        if(eventData === null || eventData === undefined) {
            deferred.reject(new Error("Parameter 'eventData' is undefined"));
        } else if (userId === null || userId === undefined) {
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
    },

    /**
     * Updates the RSVPs for an event for a user
     *
     *  null: Invited
     *  -1  : Not Going
     *  0   : Maybe
     *  1   : Going
     *
     * @param userId
     * @param eventId
     * @param rsvpBool
     */
    updateUserEventRsvp: function(userId, eventId, rsvpBool) {
        var deferred = Q.defer();

        if(userId === null || userId === undefined) {
            deferred.reject(new Error("Parameter 'userId' is undefined"));
        } else if (eventId === null || eventId === undefined) {
            deferred.reject(new Error("Parameter 'eventId' is undefined"));
        } else if (rsvpBool === null || rsvpBool == undefined) {
            deferred.reject(new Error("Parameter 'rsvpBool' is undefined"));
        } else {
            self.getEventById(eventId)
                .then(function(event) {

                    // Get index in array of RSVP object
                    var rsvpIndex = null;

                    for(var i = 0; i < event.rsvps.length; i++) {
                        if(event.rsvps[i].user_id == userId) {
                            rsvpIndex = i;
                            break;
                        }
                    }

                    // Create RSVP object if one doesn't exist for user
                    if (rsvpIndex !== null) {
                        event.rsvps[i].rsvp_bool = rsvpBool;
                    } else {
                        event.rsvps.push({
                            user_id: userId,
                            rsvp_bool: rsvpBool
                        });
                    }

                    // Save event with updated RSVPS
                    Database.connect()
                        .then(function() {
                            event.save(function(err) {
                                Database.close();

                                if(err) {
                                    deferred.reject(err);
                                } else {
                                    deferred.resolve();
                                }
                            });
                        });
                })
                .done();
        }

        return deferred.promise;
    }
};

module.exports = self;