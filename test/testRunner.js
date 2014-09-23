"use strict";

process.env.PROJECT_PATH = __dirname + "/../";
process.env.NODE_ENV = "test";

var testPath = process.env.PROJECT_PATH + "test/app";

exports.EventRepository = require(testPath + "/models/repositories/EventRepository");
exports.SessionRepository = require(testPath + "/models/repositories/SessionRepository");
//exports.FacebookService = require(testPath + "/models/services/FacebookService");