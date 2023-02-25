const express = require("express");
const router = express.Router();

const bookingRoute = require("./booking/booking");
const testRoute = require("./test/test");
const adminRoute = require("./admin/admin");
const scheduleRoute = require("./schedule/schedule");
const bookedSeatsRoute = require("./bookedseats/bookedseats");
const userRoute = require("./user/user");

router.use('/booking', bookingRoute);
router.use('/test', testRoute);
router.use('/admin', adminRoute);
router.use('/user', userRoute);
router.use('/schedule', scheduleRoute);
router.use('/bookedseats', bookedSeatsRoute);

router.get('/', (req, res) => {
    res.json({message: 'The API is up and running! (ROOT DIR)'}).status(200);
});

module.exports = router;