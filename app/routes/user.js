var router = require('express').Router();
var UserController = require("../controllers/UserController");

/* GET users listing. */
router.get('/email/:email', UserController.findByEmailAction);
router.post('/authoriseWithFacebook', UserController.authenticate);

module.exports = router;
