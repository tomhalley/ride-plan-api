"use strict";

var rewire = require("rewire"),
    Database = rewire(process.env.PROJECT_PATH + "/app/common/Database"),
    mongooseMock = require(process.env.PROJECT_PATH + "/test/mocks/mongoose");

module.exports = {
    connect: {
        testConnectsToDatabase: function(test) {
            // Arrange
            Database.__set__("mongoose", mongooseMock);

            // Act
            Database.connect()
                .then(function() {
                    test.done();
                })
                .done();
        },
        testThrowsExceptionOnFailure: function(test) {
            // Arrange
            mongooseMock.mockFailsConnection(true);
            Database.__set__("mongoose", mongooseMock);

            // Act
            Database.connect()
                .fail(function(err) {
                    test.equal(err.message, "Failed connecting to database");
                    test.done();
                })
                .done();
        }
    },
    close: {
        testCanCloseConnection: function(test) {
            // Act
            Database.close();
            test.done();
        }
    }
};