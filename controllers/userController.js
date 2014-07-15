var userRepository = require("../models/entity/userRepository");

module.exports = {
    findByIdAction: function(req, res) {
        userRepository.findUserById(req.params.id, function(user) {

            res.json(200, { message: "My first route"});
        });
    }
};