var router = require('express').Router();
var UserController = require("../controllers/UserController");

/* GET users listing. */
router.get('/email/:email', UserController.findByEmailAction);
router.get('/login/:facebook_id', UserController.authenticate);

module.exports = router;
