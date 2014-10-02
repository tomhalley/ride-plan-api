"use strict";

var EventRepository = require("../models/repositories/EventRepository"),
    SessionRepository = require("../models/repositories/SessionRepository"),
    EventService = require("../models/services/EventService"),
    ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
    indexAction: function(req, res) {
        EventRepository.getEvents()
            .then(function(events) {
                res.status(200).json(events);
            })
            .fail(function(err) {
                console.error(err);
                res.status(500);
            });
    },
    eventAction: function(req, res) {
        EventRepository.getEventById(req.params.id)
            .then(function(event) {
                res.status(200).json(event);
            })
            .fail(function(err) {
                console.error(err);
                res.status(404);
            });
    },
    createAction: function(req, res) {
        if(!EventService.validateEvent(req.body.data)) {
            res.status(500);
        }

        SessionRepository.findSessionByToken(req.headers.authorization)
            .then(function(session) {
                return EventRepository.createEvent(req.body.data, new ObjectId(session.user_id));
            })
            .then(function(event) {
                res.status(200).json(event);
            })
            .fail(function(err) {
                console.error(err);
                res.status(500).json(err);
            });
    },
    rsvpAction: function(req, res) {
        SessionRepository.findSessionByToken(req.headers.authorization)
            .then(function(session) {
                return EventRepository.updateUserEventRsvp(session.user_id, req.params.id, req.body.rsvpBool);
            })
            .then(function() {
                res.status(200);
            })
            .fail(function(err) {
                console.error(err);
                res.status(500).json(err);
            })
    }
};