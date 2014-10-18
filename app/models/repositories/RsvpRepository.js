"use strict";

var Q = require("q"),
    Database = require('../../common/Database'),
    Errors = require("../../common/Errors"),
    Rsvp = require("../entities/Rsvp");

var RSVP_INVITED = null;
var RSVP_GOING = 0;
var RSVP_MAYBE = 1;
var RSVP_NOT_GOING = 2;

var validateRsvpInt = function(rsvpInt) {
    var rsvpBools = [RSVP_GOING, RSVP_MAYBE, RSVP_NOT_GOING];
    return rsvpBools.indexOf(rsvpInt) > -1;
};

module.exports = {
    /**
     *
     * @param eventId
     * @param userId
     * @returns {promise}
     */
    getRsvpIntForUserEvent: function(eventId, userId) {
        var deferred = Q.defer();

        if(userId === null || userId === undefined) {
            deferred.reject(new Errors.AppError("Parameter 'userId' is undefined"));
        } else if (eventId === null || eventId === undefined) {
            deferred.reject(new Errors.AppError("Parameter 'eventId' is undefined"));
        } else {
            Database.connect()
                .then(function() {
                    Rsvp.findOne({event_id: eventId, user_id: userId}, function(err, rsvp) {
                        Database.close();

                        if(err) {
                            deferred.reject(new Errors.AppError(err.message));
                        } else {
                            deferred.resolve(rsvp);
                        }
                    });
                });
        }

        return deferred.promise;
    },

    /**
     * Returns list of RSVP entities for event
     *
     * @param eventId
     * @returns {promise}
     */
    getRsvpsForEvent: function(eventId) {
        var deferred = Q.defer();

        if(eventId === null || eventId === undefined) {
            deferred.reject(new Errors.AppError("Parameter 'eventId' is undefined"));
        } else {
            Database.connect()
                .then(function() {
                    Rsvp.find({event_id: eventId}, function(err, rsvps) {
                        Database.close();

                        if(err) {
                            deferred.reject(new Errors.AppError(err.message));
                        } else {
                            deferred.resolve(rsvps);
                        }
                    });
                });
        }

        return deferred.promise;
    },

    /**
     * Creates a new RSVP entry for a user/event
     *
     * @param eventId
     * @param userId
     * @param rsvpInt
     * @returns {*}
     */
    createUserRsvp: function(eventId, userId, rsvpInt) {
        var deferred = Q.defer();

        if(userId === null || userId === undefined) {
            deferred.reject(new Errors.AppError("Parameter 'userId' is undefined"));
        } else if (eventId === null || eventId === undefined) {
            deferred.reject(new Errors.AppError("Parameter 'eventId' is undefined"));
        } else if (rsvpInt === null || rsvpInt === undefined) {
            deferred.reject(new Errors.AppError("Parameter 'rsvpInt' is undefined"));
        } else {
            var rsvp = new Rsvp({
                event_id: eventId,
                user_id: userId,
                rsvp_bool: rsvpInt
            });

            Database.connect()
                .then(function() {
                    rsvp.save(function(err, savedRsvp) {
                        Database.close();

                        if(err) {
                            deferred.reject(new Errors.AppError(err.message));
                        } else {
                            deferred.resolve(savedRsvp);
                        }
                    });
                });
        }

        return deferred.promise;
    },

    /**
     * Updates or creates an existing RSVP status for a user/event
     *
     * @param eventId
     * @param userId
     * @param rsvpInt
     * @returns {*}
     */
    updateUserRsvp: function(eventId, userId, rsvpInt) {
        var deferred = Q.defer();

        if(userId === null || userId === undefined) {
            deferred.reject(new Errors.AppError("Parameter 'userId' is undefined"));
        } else if (eventId === null || eventId === undefined) {
            deferred.reject(new Errors.AppError("Parameter 'eventId' is undefined"));
        } else if (rsvpInt === null || rsvpInt === undefined) {
            deferred.reject(new Errors.AppError("Parameter 'rsvpInt' is undefined"));
        } else if (!validateRsvpInt(rsvpInt)) {
            deferred.reject(new Errors.HttpBadRequest("RSVP status was invalid"));
        } else {
            Database.connect()
                .then(function() {
                    Rsvp.findOne({event_id: eventId, user_id: userId}, function(err, rsvp) {
                        if(err) {
                            deferred.reject(new Errors.AppError(err.message));
                        } else if(rsvp === null) {
                            deferred.reject(new Errors.HttpNotFound("RSVP Could not be found"));
                        } else {
                            rsvp.rsvp_bool = rsvpInt;
                            rsvp.save(function(err, rsvp, affectedRows) {
                                Database.close();

                                if(err) {
                                    deferred.reject(new Errors.AppError(err.message));
                                } else if (affectedRows === 0) {
                                    deferred.reject(new Errors.AppError("Record was not updated :("))
                                } else {
                                    deferred.resolve(rsvp);
                                }
                            });
                        }
                    });
                })
        }

        return deferred.promise;
    }
};