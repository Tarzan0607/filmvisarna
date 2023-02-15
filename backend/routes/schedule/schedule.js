const getPool = require('../../utilities/database');
const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
    const pool = await getPool().getConnection(); 

    let data = undefined;
    try {
        const [dataTables, dataRows] = await pool.query('SELECT * FROM movies RIGHT JOIN screenings ON movies.id = screenings.movie_id LEFT JOIN auditoriums ON screenings.auditorium_id = auditoriums.id');
        data = dataTables;
    } catch {
        await pool.release();
        return res.json({message: 'failed', response: 'Database query failed to execute!'}).status(500);
    }

    await pool.release();
    res.json({message: 'success', response: data}).status(200);
});

router.get('/:movieid', async (req, res) => {
    const pool = await getPool().getConnection(); 

    const movieId = req.params.movieid;

    if (isNaN(movieId)) return res.json({message: 'failed', response: 'MovieID must be valid number!'}).status(403), await pool.release();

    let data = undefined;
    try {
        const [dataTables, dataRows] = await pool.query('SELECT * FROM movies RIGHT JOIN screenings ON movies.id = screenings.movie_id LEFT JOIN auditoriums ON screenings.auditorium_id = auditoriums.id WHERE screenings.id = ?', [movieId]);
        data = dataTables;
    } catch {
        await pool.release();
        return res.json({message: 'failed', response: 'Database query failed to execute!'}).status(500);
    }

    await pool.release();
    res.json({message: 'success', response: data}).status(200);
});

module.exports = router;