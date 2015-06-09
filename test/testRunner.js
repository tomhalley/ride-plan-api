"use strict";

require("extend-error");

process.env.NODE_PATH = __dirname + "/../.";
process.env.NODE_ENV = "test";

module.exports = {
    ConfigProvider: require("test/app/common/ConfigProvider"),
    Database: require("test/app/common/Database"),
    SessionRepository: require("test/app/models/repositories/SessionRepository"),
    EventRepository: require("test/app/models/repositories/EventRepository"),
    UserRepository: require("test/app/models/repositories/UserRepository")
};
//exports.FacebookService = require(testPath + "/models/services/FacebookService");