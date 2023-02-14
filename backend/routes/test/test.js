const getPool = require('../../utilities/database');
const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
    //const pool = await getPool().getConnection(); 
    //Get a connection to the database, then use pool.query("QUERY HERE") to send queries to the database!
    //Also make sure to await these as they are promises!
    res.json({message: 'The API is up and running!', status: 200}).status(200);
});


module.exports = router;