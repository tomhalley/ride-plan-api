var router = require('express').Router(),
    UserController = require("../controllers/UserController");

/* GET users listing. */
router.post('/authoriseWithFacebook', UserController.authenticate);

module.exports = router;
