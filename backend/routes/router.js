const express = require("express");
const router = express.Router();

const bookingRoute = require("./booking/booking");
const testRoute = require("./test/test");
const adminRoute = require("./admin/admin");
const scheduleRoute = require("./schedule/schedule");
const bookedSeatsRoute = require("./bookedseats/bookedseats");

router.use('/booking', bookingRoute);
router.use('/test', testRoute);
router.use('/admin', adminRoute);
router.use('/schedule', scheduleRoute);
router.use('/bookedseats', bookedSeatsRoute);

router.get('/', (req, res) => {
    res.json({message: 'This is the root endpoint'});
});

module.exports = router;