var failsConnection;

module.exports = {
    connection: {
        on: function(event, callback) {
            if(failsConnection) {
                callback(new Error("Failed connecting to database"));
            } else {
                callback();
            }
        },
        once: function(event, callback) {
            callback();
        },
        close: function() {}
    },
    connect: function() {

    },
    mockFailsConnection: function(bool) {
        failsConnection = bool;
    }
};