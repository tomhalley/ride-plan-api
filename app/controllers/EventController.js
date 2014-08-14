var EventRepository = require("../models/repositories/EventRepository"),
    ResponseService = require("../models/services/ResponseService"),
    SessionRepository = require("../models/repositories/SessionRepository"),
    ObjectID = require("mongoose").Types.ObjectID;

module.exports = {
    indexAction: function(req, res) {
        var count = req.params.perpage != undefined ? req.params.perpage : 20;
        var page = req.params.page != undefined ? req.params.page : 1;

        EventRepository.getEvents(count, page, function(err, events) {
            ResponseService.respondWithObject(err, events, res);
        })
    },
    eventAction: function(req, res) {
        EventRepository.getEventById(req.params.id, function(err, user) {
            ResponseService.respondWithObject(err, user, res);
        })
    },
    createAction: function(req, res) {
        SessionRepository.findSessionByToken(req.headers.authorization)
            .then(function(session) {
                SessionRepository.findSessionByToken(new ObjectID(session.user_id))
                    .then(function(session) {
                        console.log(session);
                    })
                    .done();


                EventRepository.createEvent(req.body.data, new ObjectID(session.user_id))
                    .then(function(event) {
                        res.json(200, event);
                    })
                    .fail(function(err) {
                        console.error(err);
                        res.json(500, err);
                    })
                    .done();
            });
    }
};