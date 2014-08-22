var EventRepository = require("../../../../app/models/repositories/EventRepository"),
    ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
    testCreateEvent_CanCreateEvent: function(test) {
        var userId = new ObjectId("230897461fh5");
        var eventData = {
            name: "Toms Test Event",
            //start_date_time: "2014-09-09 12:00:00",
            //end_date_time: "2014-09-09 20:00:00",
            origin: "56.26392,9.50178500000004",
            destination: "52.132633,5.2912659999999505",
            waypoints: [],
            avoidTolls: true,
            avoidHighways: true
        };

        EventRepository.createEvent(eventData, userId)
            .then(function(event) {
                test.equals(event.name, "Toms Test Event");
                test.equals(event.created_by, userId);
                test.done();
            });
    }
};
