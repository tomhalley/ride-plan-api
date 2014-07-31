var EventRepository = require("../models/repositories/EventRepository"),
    ResponseService = require("../models/services/ResponseService");

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
    }
};