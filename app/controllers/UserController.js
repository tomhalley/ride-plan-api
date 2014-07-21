var UserRepository = require("../models/repositories/UserRepository"),
    ResponseService = require("../models/services/ResponseService");

module.exports = {
    findByIdAction: function(req, res) {
        UserRepository.findUserById(req.params.id, function(err, user) {
            ResponseService.responseHandler(err, user, res);
        });
    },
    findByEmailAction: function(req, res) {
        UserRepository.findUserByEmail(req.params.email, function(err, user) {
            ResponseService.responseHandler(err, user, res);
        });
    }
};