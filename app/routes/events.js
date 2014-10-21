var router = require('express').Router(),
    EventController = require("../controllers/EventController");

/* GET events listing. */
router.get('/', EventController.indexAction);
router.put('/create', EventController.createAction);
router.get('/:id', EventController.eventAction);
router.put('/:id/rsvp', EventController.rsvpAction);

module.exports = router;