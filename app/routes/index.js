var router = require('express').Router(),
    HomeController = require("../controllers/HomeController");

/* GET home page. */
router.get('/', HomeController.indexAction);

module.exports = router;
