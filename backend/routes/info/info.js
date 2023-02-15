const getPool = require('../../utilities/database');
const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
    const pool = await getPool().getConnection();

    const [mainData, mainRows] = await pool.query('SELECT * FROM movies');

    res.json({message: 'success', response: mainData}).status(200);
});


module.exports = router;