var userRepository = require("../models/entity/userRepository");

module.exports = {
    findByIdAction: function(req, res) {
        userRepository.findUserById(req.params.id, function(user) {
            res.json(200, user);
        });
    },
    findByEmailAction: function(req, res) {
        userRepository.findUserByEmail(req.params.email, function(user) {
            res.json(200, user);
        });
    }
};