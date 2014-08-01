module.exports = {
    server: {
        port: 3000
    },
    db: {
        database: "motonet_dev",
        host: "192.168.110.50",
        port: 27017,
        options: {
            replset: {
                socketOptions: {
                    connectTimeoutMS : 2000
                }
            }
        }
    },
    redis: {
        host: "192.168.110.50",
        port: "6379",
        pass: null,
        options: null
    }
};