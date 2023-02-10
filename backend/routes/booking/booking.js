const getPool = require('../../utilities/database');
const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
    const pool = await getPool().getConnection(); 

    res.json({message: 'This is the booking endpoint'})
});


module.exports = router;