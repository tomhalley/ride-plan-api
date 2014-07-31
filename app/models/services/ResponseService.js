module.exports = {
    respondWithObject: function (err, record, res) {
        if (record === null) {
            res.json(404, "Record not found");
        } else if (err !== null) {
            res.json(500, err.message);
        } else {
            res.json(200, record);
        }
    },
    responseWithBool: function(err, bool, res) {
        if(bool) {
            res.json(200);
        } else {
            res.json(404);
        }
    }
};