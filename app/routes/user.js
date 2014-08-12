var router = require('express').Router(),
    UserController = require("../controllers/UserController");

/* GET users listing. */
router.get('/email/:email', UserController.findByEmailAction);
router.post('/authoriseWithFacebook', UserController.authenticate);

module.exports = router;
