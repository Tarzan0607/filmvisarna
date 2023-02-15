const express = require("express");
const router = express.Router();

const bookingRoute = require("./booking/booking");
const testRoute = require("./test/test");
const adminRoute = require("./admin/admin");
const spelschemaRoute = require("./spelschema/spelschema");
const bookedSeatsRoute = require("./bookedseats/bookedseats");
const infoRoute = require("./info/info");

router.use('/booking', bookingRoute);
router.use('/test', testRoute);
router.use('/admin', adminRoute);
router.use('/spelschema', spelschemaRoute);
router.use('/bookedseats', bookedSeatsRoute);
router.use('/info', infoRoute);

router.get('/', (req, res) => {
    res.json({message: 'This is the root endpoint'});
});

module.exports = router;