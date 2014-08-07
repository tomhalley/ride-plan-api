var UserRepository = require("../models/repositories/UserRepository"),
    ResponseService = require("../models/services/ResponseService"),
    AuthService = require("../models/services/AuthService"),
    FacebookService = require("../models/services/FacebookService");

module.exports = {
    authenticate: function(req, res) {
        FacebookService.authenticate(
            req.body.access_token,
            req.body.user_id,
            function(err, data) {
                if(err) {
                    console.log(err);
                    res.json(500, err);
                } else {
                    res.json(200, data);
                }
            }
        );

//        UserRepository.findUserByFacebookId(req.params.facebook_id, function(err, user) {
//            ResponseService.responseWithBool(err, (user != null), res);
//        });
    },
    findByEmailAction: function(req, res) {
        UserRepository.findUserByEmail(req.params.email, function(err, user) {
            ResponseService.respondWithObject(err, user, res);
        });
    }
};