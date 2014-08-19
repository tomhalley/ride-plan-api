module.exports = {
    validateEvent: function(eventData) {
        if(eventData == undefined || eventData == null) {
            console.log("EventData was empty");
            return false;
        }

        if(eventData.name == undefined || eventData.name == null) {
            console.log("Event did not have a name");
            return false;
        }

        return true;
    }
};