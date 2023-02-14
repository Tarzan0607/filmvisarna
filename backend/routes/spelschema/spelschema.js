const getPool = require('../../utilities/database');
const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
    const pool = await getPool().getConnection(); 

    let data = undefined;
    try {
        const [dataTables, dataRows] = await pool.query('SELECT * FROM screenings RIGHT JOIN movies ON screenings.movie_id = movies.id');
        data = dataTables;
    } catch {
        return res.json({message: 'failed', response: 'Database query failed to execute!'}).status(500);
    }

    await pool.release();
    res.json({message: 'success', response: data}).status(200);
});

router.get('/:movieid', async (req, res) => {
    const pool = await getPool().getConnection(); 

    const movieId = req.params.movieid;

    if (!movieId) return res.json({message: 'failed', response: 'Could not find MovieID!'}).status(403);

    if (isNaN(movieId)) return res.json({message: 'failed', response: 'MovieID must be valid number!'}).status(403);

    let data = undefined;
    try {
        const [dataTables, dataRows] = await pool.query('SELECT * FROM screenings RIGHT JOIN movies ON screenings.movie_id = movies.id WHERE screenings.id = ?', [movieId]);
        data = dataTables;
    } catch {
        return res.json({message: 'failed', response: 'Database query failed to execute!'}).status(500);
    }

    await pool.release();
    res.json({message: 'success', response: data}).status(200);
});

module.exports = router;