const express = require("express");
const router = express.Router();

const bookingRoute = require("./booking/booking");
const testRoute = require("./test/test");
const adminRoute = require("./admin/admin");
const spelschemaRoute = require("./spelschema/spelschema");

router.use('/booking', bookingRoute);
router.use('/test', testRoute);
router.use('/admin', adminRoute);
router.use('/spelschema', spelschemaRoute);

router.get('/', (req, res) => {
    res.json({message: 'This is the root endpoint'});
});

module.exports = router;