var UserRepository = require("../models/repositories/UserRepository"),
    FacebookService = require("../models/services/FacebookService");

module.exports = {
    authenticate: function(req, res) {
        FacebookService.authenticate(req.body.access_token, req.body.user_id)
            .then(function(data) {
                res.json(200, data);
            })
            .fail(function(err) {
                console.log(err);
                res.json(500, err);
            });
    },
    findByEmailAction: function(req, res) {
        UserRepository.findUserByEmail(req.params.email)
            .then(function(user) {
                if(user == null || user == undefined) {
                    res.json(400);
                } else {
                    res.json(200, data);
                }
            })
            .fail(function(err) {
                res.json(500, err);
            });
    }
};