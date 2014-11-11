"use strict";

var Errors = require("../common/Errors");

module.exports = {
    handleError: function(res, err) {
        if(err instanceof Errors.AppError) {
            console.error(err);
            res.status(err.code).json();
        } else if(err instanceof Errors.ClientError) {
            res.status(err.code).json(err.message);
        } else {
            console.error("An exception escaped from error handling: ". err);
            console.error(err.stack());
            res.status(500).json();
        }
    }
};