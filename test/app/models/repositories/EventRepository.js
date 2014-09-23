var rewire = require('rewire'),
    EventRepository = rewire(process.env.PROJECT_PATH + "/app/models/repositories/EventRepository"),
    DatabaseMock = require(process.env.PROJECT_PATH + "/test/mocks/common/Database"),
    EventMock = require(process.env.PROJECT_PATH + "/test/mocks/models/entities/Event"),
    ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
    setUp: function(callback) {
        EventRepository.__set__("Database", DatabaseMock);
        EventRepository.__set__("Event", EventMock);
        callback();
    },
    testExists: function(test) {
        // Assert
        test.notEqual(EventRepository, null);
        test.notEqual(EventRepository, undefined);
        test.done();
    },
    getEvents: {
        testGetsEvents: function(test) {
            // Assert
            EventRepository.getEvents()
                .then(function(events) {
                    test.notEqual(events, undefined);
                    test.equal(events.length, 1);
                    test.done();
                })
                .done();
        },
        testThrowsExceptionIfEntityFails: function(test) {
            // Arrange
            EventMock.mockReturnError("Entity Failed");

            // Assert
            EventRepository.getEvents()
                .fail(function(err) {
                    test.equal(err.message, "Entity Failed")
                    test.done();
                })
                .done();
        }
    },

    getEventById: {
        testGetsEvent: function(test) {
            // Arrange
            EventMock.mockReturnError(false);

            // Act
            EventRepository.getEventById(12)
                .then(function(event) {
                    test.notEqual(event, undefined);
                    test.done();
                })
                .done();
        },
        testThrowsExceptionIfNoEventIdGiven: function(test) {
            // Act
            EventRepository.getEventById()
                .fail(function(err) {
                    test.equals(err.message, "EventId cannot be null");
                    test.done();
                })
                .done();
        },
        testThrowsExceptionIfEntityFails: function(test) {
            // Arrange
            EventMock.mockReturnError("Entity Failed");

            // Act
            EventRepository.getEventById(12)
                .fail(function(err) {
                    test.equals(err.message, "Entity Failed");
                    test.done();
                })
                .done();
        }
    },

    createEvent: {
        testCreatesEvent: function(test) {
            // Arrange
            EventMock.mockReturnError("Entity Failed");
            EventRepository.__set__("Event", EventMock.mockInstantiation());

            // Act
            var userId = new ObjectId("230897461fh5");
            var eventData = {
                name: "Toms Test Event",
                origin: "56.26392,9.50178500000004",
                waypoints: [],
                destination: "52.132633,5.2912659999999505",
                start_time: "2014-09-09 12:00:00",
                end_time: "2014-09-09 20:00:00",
                avoid_tolls: 1,
                avoid_highways: 0,
                is_private: 0
            };

            EventRepository.createEvent(eventData, userId)
                .then(function(event) {
                    test.equals(event.name, "Toms Test Event");
                    test.equals(event.created_by, userId);
                    test.done();
                })
                .done();
        }
    }
};
