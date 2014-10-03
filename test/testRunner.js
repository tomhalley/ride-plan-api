"use strict";

require("extend-error");

process.env.PROJECT_PATH = __dirname + "/../";
process.env.NODE_ENV = "test";

var testPath = process.env.PROJECT_PATH + "test/app";

module.exports = {
    ConfigProvider: require(testPath + "/common/ConfigProvider"),
    Database: require(testPath + "/common/Database"),
    SessionRepository: require(testPath + "/models/repositories/SessionRepository"),
    EventRepository: require(testPath + "/models/repositories/EventRepository"),
    UserRepository: require(testPath + "/models/repositories/UserRepository")
};
//exports.FacebookService = require(testPath + "/models/services/FacebookService");