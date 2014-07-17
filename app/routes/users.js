var express = require('express');
var router = express.Router();
var userController = require("../controllers/userController");

/* GET users listing. */
router.get('/id/:id', userController.findByIdAction);
router.get('/email/:email', userController.findByEmailAction);

module.exports = router;
