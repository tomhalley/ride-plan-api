module.exports = {
    server: {
        port: process.env.PORT || 80
    },
    db: {
        database: "app28020598",
        host: "lennon.mongohq.com",
        port: 10074,
        username: "heroku",
        password: "CXGd0sWqo0ByXv-NdFl_MK3xzpaXfsnWjhZVbKhlxVTc4WL05mE2PPP4NQ5YAR5ddD5ls2uQY2eQ14ABsAeCAQ",
        options: {
            replset: {
                socketOptions: {
                    connectTimeoutMS : 8000
                }
            }
        }
    },
    redis: {
        host: "redis://redistogo:aa637d5a3c5fc2ac729861931763f91d@jack.redistogo.com",
        port: 10741,
        pass: null,
        options: null
    }
};