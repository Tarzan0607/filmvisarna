const getPool = require('../../utilities/database');
const dateNow = require("../../utilities/date-format");
const generate = require("../../utilities/generate-id");
const express = require("express");
const router = express.Router();

router.get('/:movieid', async (req, res) => {
    const pool = await getPool().getConnection();

    const movieId = req.params.movieid;

    if (isNaN(movieId)) return res.json({message: 'failed', response: 'MovieID must be valid number!'}).status(403), await pool.release();

    let data = undefined;
    try {
        const [dataTables, dataRows] = await pool.query('SELECT * FROM movies RIGHT JOIN screenings ON movies.id = screenings.movie_id WHERE movies.id = ?', [movieId]);
        data = dataTables;
    } catch {
        await pool.release();
        return res.json({message: 'failed', response: 'Database query failed to execute!'}).status(500);
    }

    await pool.release();
    res.json({message: 'success', response: data}).status(200);
});

router.post('/', async (req, res) => {
    const pool = await getPool().getConnection();

    const bookedTickets = req.body;

    if (!Array.isArray(bookedTickets)) return res.json({message: 'failed', response: 'Recieved body with no valid Array!'}).status(403), await pool.release();

    const seatId = req.body[0].seatid;
    const screeningId = req.body[0].screeningid;
    const ticketType = req.body[0].tickettype;
    const currentDate = dateNow();

    if (!seatId) return res.json({message: 'failed', response: 'No SeatID could be found!'}).status(403), await pool.release();
    if (!screeningId) return res.json({message: 'failed', response: 'No ScreeningID could be found!'}).status(403), await pool.release();
    if (!ticketType) return res.json({message: 'failed', response: 'No TicketType could be found!'}).status(403), await pool.release();
    if (ticketType !== 1 && ticketType !== 2 && ticketType !== 3) return res.json({message: 'failed', response: 'TicketType is not valid type!'}).status(403), await pool.release();

    const bookingNumber = generate();
    
    try {
        await pool.query('INSERT INTO booking (time,booking_number,screening_id) VALUES(?, ?, ?)', [currentDate, bookingNumber, screeningId]);
    } catch {
        await pool.release();
        return res.json({message: 'failed', response: 'Database query failed to execute!'}).status(500);
    }

    const [lastInserted, insertRows] = await pool.query('SELECT LAST_INSERT_ID()');

    const bookingId = lastInserted[0]['LAST_INSERT_ID()'];

    for (let ticket of bookedTickets) {
        try {
            await pool.query('INSERT INTO bookingsxseats (booking_id, seat_id, ticketType_id) VALUES(?, ?, ?)', [bookingId, ticket.seatid, ticket.tickettype]);
        } catch(e) {
            console.log(e);
            await pool.release();
            return res.json({message: 'failed', response: 'Database query failed to execute!'}).status(500);
        }
    }

    await pool.release();

    res.json({message: 'success', response: bookingNumber}).status(200);
});

router.get('/', async (req, res) => {
    const pool = await getPool().getConnection();

    const [moviesData, moviesRows] = await pool.query('SELECT * FROM movies');

    const [ticketTypes, ticketRows] = await pool.query('SELECT * FROM tickettypes');

    const [screenings, screeningRows] = await pool.query('SELECT * FROM screenings');

    const [seats, seatsRow] = await pool.query('SELECT * FROM seats');

    res.json({message: 'success', response: {tickets: ticketTypes, movies: moviesData, screenings: screenings, seats: seats}}).status(200);
});

module.exports = router;