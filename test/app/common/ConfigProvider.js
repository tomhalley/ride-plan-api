"use strict";

var rewire = require("rewire"),
    yamlMock = require("test/mocks/yaml"),
    ConfigProvider = rewire("app/common/ConfigProvider");

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
    getConnectionString: {
        testGetsConnectionStringWithoutUsernameAndPassword: function(test) {
            // Arrange
            var string = ConfigProvider.getConnectionString();

            // Act
            test.equal(string, "mongodb://192.168.110.50:27017/motonet_test");
            test.done();
        },
        testGetsConnectionStringWithUsernameAndPassword: function(test) {
            // Arrange
            yamlMock.mockLoadWithCredentials(true);
            ConfigProvider.__set__("YAML", yamlMock);

            var string = ConfigProvider.getConnectionString();

            // Act
            test.equal(string, "mongodb://user:password123@192.168.110.50:27017/motonet_test");
            test.done();
        }
    },
    getFacebookAppToken: {
        testGetsFacebookAppToken: function(test) {
            // Arrange
            var facebookAppToken = ConfigProvider.getFacebookAppToken();

            // Act
            test.equal(facebookAppToken, "1478753505705619|51df55fc5c7a9a7e555d8ec26e131f72")
            test.done();
        }
    }
};