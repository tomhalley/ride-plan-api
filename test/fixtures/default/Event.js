/**
 _id: {type: String, select: false},
 __v: {type: Number, select: false},
 id: Number,
 name: String,
 start_date_time: Date,
 end_date_time: Date,
 created_by: Number,
 waypoints: Array

 */

exports.events = [
    {
        id: 1,
        name: "Boxhill - Brighton",
        start_date_time: "2014-08-01 08:00:00",
        end_date_time: "2014-08-01 18:00:00",
        created_by: 1,
        waypoints: [
            {
                id: 120937230,
                date_time: "2014-08-01 12:00:00"
            },
            {
                id: 2348762342,
                date_time: "2014-08-01 15:00:00"
            },
            {
                id: 32198746,
                date_time: "2014-08-01 18:00:00"
            }
        ]
    }
];