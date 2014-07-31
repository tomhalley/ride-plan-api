var UserRepository = require("../models/repositories/UserRepository"),
    ResponseService = require("../models/services/ResponseService");

module.exports = {
    authenticate: function(req, res) {
        UserRepository.findUserByFacebookId(req.params.facebook_id, function(err, user) {
            ResponseService.responseWithBool(err, (user != null), res);
        });
    },
    findByEmailAction: function(req, res) {
        UserRepository.findUserByEmail(req.params.email, function(err, user) {
            ResponseService.respondWithObject(err, user, res);
        });
    }
};