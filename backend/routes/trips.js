var express = require("express");
var router = express.Router();

const Trip = require('../models/trips');
const moment = require('moment');

router.get("/", function (req, res) {

    let startOfDay = moment('2023-01-25').startOf('day').utc().toDate();
    startOfDay = startOfDay.getTime() - startOfDay.getTimezoneOffset()*60000;
    startOfDay = new Date(startOfDay);
    
    let endOfDay = moment('2023-01-25').endOf('day').utc().toDate();
    endOfDay = endOfDay.getTime() - endOfDay.getTimezoneOffset()*60000;
    endOfDay = new Date(endOfDay);

    
    Trip.find({ departure: req.query.departure, arrival: req.query.arrival, date: { $gt : startOfDay, $lt : endOfDay}} )

    .then(trips => {

        if(!trips){
            res.json({ result: "Trip no found" });
        }

        res.json({ trips });
    })
});


router.get('/:id', (req, res) => {

    Trip.findOne({ _id: req.params.id })
        .then(trip => {

            if(!trip){
                res.json({ result: "Trip no found" });
            }
    
            res.json({ trip })
        })
})



router.post('/', (req, res) => {

    const { departure, arrival, tripDate, price } = req.body;

    const newTrip = new Trip({
        departure: departure,
        arrival: arrival,
        tripDate: tripDate,
        price: price,
    });

    newTrip.save()
        .then(() => {
            res.json({ result: true, trip: newTrip })
        })
});



router.delete('/:id', (req, res) => {

    Trip.deleteOne({ _id: req.params.id })
        .then(trip => {
            res.json({ trip })
        })

    .then(trips => {

        if(!trips){
            res.json({ result: "Trip no found" });
        }

        res.json({ trips });
    })
})



module.exports = router;
