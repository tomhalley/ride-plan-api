"use strict";

process.env.PROJECT_PATH = __dirname + "/../";
process.env.NODE_ENV = "test";

var testPath = process.env.PROJECT_PATH + "test/app";

exports.SessionService = require(testPath + "/models/services/SessionService");
exports.FacebookService = require(testPath + "/models/services/FacebookService");
