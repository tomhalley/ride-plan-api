"use strict";

var UserRepository = require("../models/repositories/UserRepository"),
    FacebookService = require("../models/services/FacebookService");

module.exports = {
    authenticate: function(req, res) {
        FacebookService.authenticate(req.body.access_token, req.body.user_id)
            .then(function(data) {
                res.status(200).json(data);
            })
            .catch(function(err) {
                console.log(err.stack);
                res.status(500).json(err);
            });
    },
    findByEmailAction: function(req, res) {
        UserRepository.findUserByEmail(req.params.email)
            .then(function(user) {
                if(user === null || user === undefined) {
                    res.status(400);
                } else {
                    res.status(200).json(user);
                }
            })
            .fail(function(err) {
                res.status(500).json(err);
            });
    }
};