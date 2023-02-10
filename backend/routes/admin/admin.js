const getPool = require('../../utilities/database');
const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
    const pool = await getPool().getConnection(); 

    //const [dataTables, dataRows] = await pool.query('SELECT * FROM auditoriums RIGHT JOIN screenings ON auditoriums.id = screenings.auditorium_id WHERE auditoriums.id = 1');
    const [dataTables, dataRows] = await pool.query('SELECT * FROM booking RIGHT JOIN screenings ON booking.screening_id = screenings.id RIGHT JOIN bookingxseats ON booking.id = bookingxseats.booking_id WHERE booking.screening_id = 1');
    console.log(dataTables);

    res.json({message: 'This is the admin endpoint', response: dataTables});
});


module.exports = router;