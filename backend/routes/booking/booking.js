const getPool = require('../../utilities/database');
const dateNow = require("../../utilities/date-format");
const generate = require("../../utilities/generate-id");
const express = require("express");
const router = express.Router();

router.get('/:movieid', async (req, res) => {
    const pool = await getPool().getConnection();

    const movieId = req.params.movieid;

    if (isNaN(movieId)) return res.json({message: 'failed', response: 'MovieID must be valid number!'}).status(403);

    let data = undefined;
    try {
        const [dataTables, dataRows] = await pool.query('SELECT * FROM movies RIGHT JOIN screenings ON movies.id = screenings.movie_id WHERE movies.id = ?', [movieId]);
        data = dataTables;
    } catch {
        return res.json({message: 'failed', response: 'Database query failed to execute!'}).status(500);
    }

    await pool.release();
    res.json({message: 'success', response: data}).status(200);
});

router.post('/', async (req, res) => {
    const pool = await getPool().getConnection();

    const seatId = req.body.seatid;
    const screeningId = req.body.screeningid;
    const ticketType = req.body.tickettype;
    const currentDate = dateNow();

    if (!seatId) return res.json({message: 'failed', response: 'No SeatID could be found!'}).status(403);
    if (!screeningId) return res.json({message: 'failed', response: 'No ScreeningID could be found!'}).status(403);
    if (!ticketType) return res.json({message: 'failed', response: 'No TicketType could be found!'}).status(403);

    let occupiedSeat = undefined;
    try {
        const [dataTables, dataRows] = await pool.query('SELECT * FROM bookingxseats RIGHT JOIN booking ON booking.id = bookingxseats.booking_id WHERE bookingxseats.booking_id = ?', [seatId]);
        occupiedSeat = dataTables;
    } catch {
        return res.json({message: 'failed', response: 'Database query failed to execute!'}).status(500);
    }

    if (occupiedSeat.length !== 0) return res.json({message: 'failed', response: 'Seat is already occupied, how was this accessed!?'}).status(403);

    const bookingNumber = generate();

    try {
        await pool.query('INSERT INTO booking (time,booking_number,screening_id) VALUES(?, ?, ?)', [currentDate, bookingNumber, screeningId]);
    } catch {
        return res.json({message: 'failed', response: 'Database query failed to execute!'}).status(500);
    }

    res.json({message: 'success', response: null}).status(200);
});

module.exports = router;