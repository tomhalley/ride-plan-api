var mockConfig = {
    server: { port: 3000 },
    db: {
        database: 'motonet_test',
        host: '192.168.110.50',
        port: 27017,
        options: { replset: [Object] } },
    redis:{
        host: '192.168.110.50',
        port: '6379',
        pass: null,
        options: null },
    facebook:{
        app_id: 1478753505705619,
        app_secret: '51df55fc5c7a9a7e555d8ec26e131f72'
    }
};

var loadWithDbCredentials;

module.exports = {
    load: function(path) {
        if(!loadWithDbCredentials) {
            return mockConfig;
        }

        mockConfig.db.username = "user";
        mockConfig.db.password = "password123";

        return mockConfig;
    },
    mockLoadWithCredentials: function(bool) {
        loadWithDbCredentials = bool;
    }
};