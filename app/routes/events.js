var router = require('express').Router(),
    EventController = require("../controllers/EventController");

/* GET events listing. */
router.get('/', EventController.indexAction);
router.get('/all', EventController.indexAction);
router.get('/all/:perpage', EventController.indexAction);
router.get('/all/:perpage/:page', EventController.indexAction);

router.get('/:id', EventController.eventAction);

module.exports = router;