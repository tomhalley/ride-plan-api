var express = require('express');
var router = express.Router();
var userController = require("../controllers/userController");

/* GET users listing. */
router.get('/:id', userController.findByIdAction);

module.exports = router;
