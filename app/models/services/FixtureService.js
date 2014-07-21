var fixtures = require('pow-mongodb-fixtures').connect(
        require("../../common/ConfigProvider").getConnectionString()
    );

module.exports = {
    loadFixtures: function(fixtureSet, callback) {
        fixtures.clearAndLoad("../../../test/fixtures/" + fixtureSet, function(err) {
            fixtures.client.close();
            callback(err);
        });
    },
    purgeDatabase: function(callback) {
        fixtures.clear(function(err) {
            fixtures.client.close();
            callback(err);
        })
    }
};