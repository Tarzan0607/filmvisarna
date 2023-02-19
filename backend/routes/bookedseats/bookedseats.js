const getPool = require('../../utilities/database');
const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
    const pool = await getPool().getConnection();

    if (!req.query.screening) return res.json({message: 'failed', response: 'No ScreeningID was provided!'}).status(403), await pool.release();

    const screeningId = req.query.screening;

    if (isNaN(screeningId)) return res.json({message: 'failed', response: 'ScreeningID must be a valid number!'}).status(403), await pool.release();

    const [bookedSeats, bookedRows] = await pool.query('SELECT * FROM booking RIGHT JOIN bookingsxseats ON booking.id = bookingsxseats.booking_id RIGHT JOIN screenings ON booking.screening_id = screenings.id WHERE screenings.id = ?', [screeningId]);

    if (bookedSeats.length === 0) return res.json({message: 'failed', response: 'No screenings could be found with ID!'}).status(403), await pool.release();

    if (!bookedSeats[0]?.seat_id) return res.json({message: 'failed', response: 'No bookings found for chosen screening!'}).status(403), await pool.release();

    await pool.release();
    res.json({message: 'success', response: bookedSeats}).status(200);
});


module.exports = router;