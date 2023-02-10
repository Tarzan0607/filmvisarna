const getPool = require('../../utilities/database');
const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
    //const pool = await getPool().getConnection(); 
    //Get a connection to the database, then use pool.query("QUERY HERE") to send queries to the database!
    //Also make sure to await these as they are promises!

    res.json({message: 'This is the test endpoint'});
});


module.exports = router;