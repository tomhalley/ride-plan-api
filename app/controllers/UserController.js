var UserRepository = require("../models/repositories/UserRepository"),
    Database = require("../common/Database");

var responseHandler = function(err, record, res) {
    if(record === null) {
        res.json(404, "Record not found");
    } else if (err !== null) {
        res.json(500, err.message);
    } else {
        res.json(200, record);
    }
    Database.close();
};

module.exports = {
    findByIdAction: function(req, res) {
        UserRepository.findUserById(req.params.id, function(err, user) {
            responseHandler(err, user, res);
        });
    },
    findByEmailAction: function(req, res) {
        UserRepository.findUserByEmail(req.params.email, function(err, user) {
            responseHandler(err, user, res);
        });
    }
};