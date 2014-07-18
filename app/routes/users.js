var router = require('express').Router();
var UserController = require("../controllers/UserController");

/* GET users listing. */
router.get('/id/:id', UserController.findByIdAction);
router.get('/email/:email', UserController.findByEmailAction);

module.exports = router;
