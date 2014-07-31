var UserRepository = require("../models/repositories/UserRepository"),
    ResponseService = require("../models/services/ResponseService");

module.exports = {
    findByEmailAction: function(req, res) {
        UserRepository.findUserByEmail(req.params.email, function(err, user) {
            ResponseService.responseHandler(err, user, res);
        });
    }
};