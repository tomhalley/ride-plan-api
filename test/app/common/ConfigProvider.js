"use strict";

var rewire = require("rewire"),
    ConfigProvider = rewire(process.env.PROJECT_PATH + "/app/common/ConfigProvider");

module.exports = {
    setUp: function(callback) {
        process.env.NODE_ENV = "test";
        callback();
    },
    getConfig: {
        testCanLoadConfigFile: function(test) {
            // Act
            var config = ConfigProvider.getConfig();

            // Assert
            test.equal(config.server.port, 3000);
            test.done();
        },
        testThrowsExceptionIfNODE_ENVNotDefined: function(test) {
            // Arrange
            delete process.env.NODE_ENV;

            // Act
            try {
                ConfigProvider.getConfig();
            } catch (err) {
                test.equal(err.message, "NODE_ENV not defined");
            }

            test.done();
        },
        testThrowsExceptionIfNoConfigFileFoundForNODE_ENV: function(test) {
            // Arrange
            process.env.NODE_ENV = "nonsense";

            // Act
            try {
                ConfigProvider.getConfig();
            } catch (err) {
                test.equal(err.message, "Could not find config for nonsense");
            }

            test.done();
        }
    },
    //getConnectionString: {
    //
    //},
    //getFacebookAppToken: {
    //
    //}
};