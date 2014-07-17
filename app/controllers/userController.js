var user_repository = require("../models/repositories/user_repository");

var responseHandler = function(err, record, res) {
    if(record === null) {
        res.json(404, "Record not found");
    } else if (err !== null) {
        res.json(500, err.message);
    } else {
        res.json(200, record);
    }
};

module.exports = {
    findByIdAction: function(req, res) {
        user_repository.findUserById(req.params.id, function(err, user) {
            responseHandler(err, user, res);
        });
    },
    findByEmailAction: function(req, res) {
        user_repository.findUserByEmail(req.params.email, function(err, user) {
            responseHandler(err, user, res);
        });
    }
};