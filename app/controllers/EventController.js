"use strict";

var EventRepository = require("../models/repositories/EventRepository"),
    ResponseService = require("../models/services/ResponseService"),
    SessionRepository = require("../models/repositories/SessionRepository"),
    EventService = require("../models/services/EventService"),
    ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
    indexAction: function(req, res) {
        EventRepository.getEvents(function(err, events) {
            ResponseService.respondWithObject(err, events, res);
        });
    },
    eventAction: function(req, res) {
        EventRepository.getEventById(req.params.id, function(err, user) {
            ResponseService.respondWithObject(err, user, res);
        });
    },
    createAction: function(req, res) {
        if(!EventService.validateEvent(req.body.data)) {
            res.json(500);
        }

        SessionRepository.findSessionByToken(req.headers.authorization)
        .then(function(session) {
            return EventRepository.createEvent(req.body.data, new ObjectId(session.user_id));
        })
        .then(function(event) {
            res.json(200, event);
        })
        .catch(function(err) {
            console.error(err.stack);
            //res.json(500, err);
        });
    }
};