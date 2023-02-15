const getPool = require('../../utilities/database');
const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
    const pool = await getPool().getConnection(); 

    res.json({message: 'The API is up and running!'}).status(200);
});


module.exports = router;