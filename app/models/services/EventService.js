module.exports = {
    validateEvent: function(eventData) {
        if(eventData == undefined || eventData == null) {
            throw new Error("EventData was empty");
        }

        if(eventData.name == undefined || eventData.name == null) {
            throw new Error("Event did not have a name");
        }

        return true;
    }
};