module.exports = {
    respondWithObject: function (err, record, res) {
        if (record === null) {
            res.status(404).json("Record not found");
        } else if (err !== null) {
            res.status(500).json(err.message);
        } else {
            res.status(200).json(record);
        }
    },
    responseWithBool: function(err, bool, res) {
        if(bool) {
            res.status(200);
        } else {
            res.status(404);
        }
    }
};