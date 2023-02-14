const getPool = require('../../utilities/database');
const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
    const pool = await getPool().getConnection();

    let data = undefined;
    try {
        const [dataTables, dataRows] = await pool.query('SELECT * FROM booking RIGHT JOIN screenings ON booking.screening_id = screenings.id RIGHT JOIN bookingxseats ON booking.id = bookingxseats.booking_id');
        data = dataTables;
    } catch {
        return res.json({message: 'failed', response: 'Database query failed to execute!'}).status(500);
    }

    await pool.release();
    res.json({message: 'success', response: data}).status(200);
});

/*router.get('/', async (req, res) => { //Query way of below version!
    const pool = await getPool().getConnection();

    const bookingId = req.query.bookingid;

    if (!bookingId) {
        let data = undefined;
        try {
            const [dataTables, dataRows] = await pool.query('SELECT * FROM booking RIGHT JOIN screenings ON booking.screening_id = screenings.id RIGHT JOIN bookingxseats ON booking.id = bookingxseats.booking_id');
            data = dataTables;
        } catch {
            return res.json({message: 'failed', response: 'Database query failed to execute!'}).status(500);
        }
    
        await pool.release();
        return res.json({message: 'success', response: data}).status(200);
    }

    let data = undefined;
    try {
        const [dataTables, dataRows] = await pool.query('SELECT * FROM booking RIGHT JOIN screenings ON booking.screening_id = screenings.id RIGHT JOIN bookingxseats ON booking.id = bookingxseats.booking_id WHERE booking.id = ?', [bookingId]);
        data = dataTables;
    } catch {
        return res.json({message: 'failed', response: 'Database query failed to execute!'}).status(500);
    }

    await pool.release();
    res.json({message: 'success', response: data}).status(200);
});*/

router.get('/:bookingid', async (req, res) => {
    const pool = await getPool().getConnection(); 

    const bookingId = req.params.bookingid;

    if (!bookingId) return res.json({message: 'failed', response: 'Could not find BookingID!'}).status(403);

    if (isNaN(bookingId)) return res.json({message: 'failed', response: 'BookingID must be valid number!'}).status(403);

    let data = undefined;
    try {
        const [dataTables, dataRows] = await pool.query('SELECT * FROM booking RIGHT JOIN screenings ON booking.screening_id = screenings.id RIGHT JOIN bookingxseats ON booking.id = bookingxseats.booking_id WHERE booking.id = ?', [bookingId]);
        data = dataTables;
    } catch {
        return res.json({message: 'failed', response: 'Database query failed to execute!'}).status(500);
    }

    await pool.release();
    res.json({message: 'success', response: data}).status(200);
});

module.exports = router;