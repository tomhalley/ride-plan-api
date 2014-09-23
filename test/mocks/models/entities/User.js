module.exports = {
    mockInstantiation: function() {
        return function(parameters) {
            return {
                save: function(callback) {
                    callback(null, parameters);
                }
            }
        }
    }
};
