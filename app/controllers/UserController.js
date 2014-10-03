"use strict";

var Errors = require("../common/Errors"),
    ErrorHandler = require("../common/ErrorHandler"),
    UserRepository = require("../models/repositories/UserRepository"),
    FacebookService = require("../models/services/FacebookService");

module.exports = {
    authenticate: function(req, res) {
        if(req.body.access_token === undefined) {
            throw new Errors.HttpBadRequest("Access token was missing");
        }

        if(req.body.user_id === undefined) {
            throw new Errors.HttpBadRequest("User id was missing");
        }

        FacebookService.authenticate(req.body.access_token, req.body.user_id)
            .then(function(data) {
                res.status(200).json(data);
            })
            .fail(function(err) {
                ErrorHandler.handleError(res, err);
            });
    }
};