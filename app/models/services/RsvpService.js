"use strict";

var Q = require("q"),
    Errors = require("../../common/Errors"),
    RsvpRepository = require("../repositories/RsvpRepository"),
    EventRepository = require("../repositories/EventRepository");

module.exports = {
    updateUserEventRsvp: function(userId, eventId, rsvpInt) {
        var deferred = Q.defer();

        if(userId === null || userId === undefined) {
            deferred.reject(new Errors.AppError("Parameter 'userId' is undefined"));
        } else if (eventId === null || eventId === undefined) {
            deferred.reject(new Errors.AppError("Parameter 'eventId' is undefined"));
        } else if (rsvpInt === null || rsvpInt === undefined) {
            deferred.reject(new Errors.AppError("Parameter 'rsvpInt' is undefined"));
        } else {
            // Logic
            EventRepository.getEventById(eventId)
                .then(function(event) {
                    if(event === null) {
                        throw new Errors.HttpNotFound("Event not found");
                    }

                    return RsvpRepository.getRsvpIntForUserEvent(eventId, userId);
                })
                .then(function(rsvp) {
                    if(rsvp === null) {
                        return RsvpRepository.createUserRsvp(eventId, userId, rsvpInt);
                    }

                    return RsvpRepository.updateUserRsvp(eventId, userId, rsvpInt);
                })
                .then(function() {
                    deferred.resolve();
                })
                .done();
        }

        return deferred.promise;
    },
    getUserEventRsvp: function(userId, eventId) {

    },
    getEventRsvpBreakdown: function(eventId) {

    }
};