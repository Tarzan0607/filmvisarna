const getPool = require('../../utilities/database');
const auth = require("../../utilities/token-auth");
const { v4: uuidv4 } = require('uuid');
const express = require("express");
const argon2 = require('argon2');
const router = express.Router();
const jwt = require("jsonwebtoken");


router.post('/login', async (req, res) => {
    const pool = await getPool().getConnection();

    const authenticationData = req.body.auth;
    const authenticationPass = req.body.password;

    if (req.session.loggedIn) return res.json({message: 'failed', response: 'already logged in'}).status(403), await pool.release();
    if (!authenticationData) return res.json({message: 'failed', response: 'No auth data found!'}).status(403), await pool.release();
    if (!authenticationPass) return res.json({message: 'failed', response: 'No password found!'}).status(403), await pool.release();

    const [userData, userRows] = await pool.query('SELECT * FROM users WHERE username = ? OR email = ?', [authenticationData, authenticationData]);

    if (userData.length === 0) return res.json({message: 'failed', response: 'invalid auth'}).status(403), await pool.release();

    if (argon2.verify(userData[0].password, authenticationPass)) {
        await pool.release();

        req.session.user = userData[0].username;
        req.session.loggedIn = true;

        const token = userData[0].api_token;

        return res.json({
            message: 'success',
            response: 'logged in',
            user: userData[0].username,
            isAdmin: userData[0].isAdmin,
            token
        }).status(200);
    } else {
        await pool.release();

        req.session.user = '';
        req.session.loggedIn = false;

        res.json({
            message: 'failed',
            response: 'invalid password'
        }).status(403);
    }
});

router.delete('/login', async (req, res) => {
    if (!req.session.loggedIn) return res.json({message: 'failed', response: 'Not logged in!'}).status(403);

    req.session.user = '';
    req.session.loggedIn = false;

    res.json({message: 'success', response: 'logged out'}).status(200);
});

router.post('/token-refresh', async(req, res) => {
    const pool = await getPool().getConnection();

    if (!req.session.loggedIn) return res.json({message: 'failed', response: 'Not logged in!'}).status(403), await pool.release();
    if (req.session.user !== 'PGamingHD') return res.json({message: 'failed', response: 'PGamingHD is only allowed to refresh tokens!'}).status(403), await pool.release();

    const userId = req.body.userid;

    const [userData, userRows] = await pool.query('SELECT * FROM users WHERE user_id = ?', [userId]);
    
    if (userData.length === 0) return res.json({message: 'failed', response: 'invalid user id'}).status(403), await pool.release();

    let newToken;
    if (userData[0].isAdmin) {
        newToken = jwt.sign({ userId: userData[0].user_id, username: userData[0].username }, "RandomGeneratedSecretStringKeepSECRET123!@#", { expiresIn: "30d" });
    } else {
        newToken = jwt.sign({ userId: userData[0].user_id, username: userData[0].username }, "RandomGeneratedSecretStringKeepSECRET123!@#", { expiresIn: "24h" });
    }

    await pool.query('UPDATE users SET api_token = ? WHERE user_id = ?', [newToken, userId]);
    await pool.release();

    res.json({message: 'success', response: 'token refreshed', token: newToken}).status(200);
});

router.get('/auth', auth, async (req, res) => {
    res.json({message: 'Has access!'});
});

router.post('/register', async (req, res) => {
    const pool = await getPool().getConnection();

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const userId = uuidv4();

    if (!username) return res.json({message: 'failed', response: 'No username found!'}).status(403), await pool.release();
    if (!password) return res.json({message: 'failed', response: 'No password found!'}).status(403), await pool.release();
    if (!email) return res.json({message: 'failed', response: 'No email found!'}).status(403), await pool.release();

    const [userData, userRows] = await pool.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email]);

    if (userData.length !== 0) return res.json({message: 'failed', response: 'username or email already registered'}).status(403), await pool.release();

    const hashedPassword = await argon2.hash(password, {type: argon2.argon2id, timeCost: 3, memoryCost: 4096, parallelism: 1});

    const token = jwt.sign({ userId: userId, username: username }, "RandomGeneratedSecretStringKeepSECRET123!@#", { expiresIn: "24h" });

    try {
        await pool.query('INSERT INTO users (user_id, username, password, email, api_token) VALUES (?, ?, ?, ?, ?)', [userId, username, hashedPassword, email, token]);
        await pool.release();
    } catch {
        await pool.release();
        return res.json({message: 'failed', response: 'Database query failed to execute!'}).status(500);
    }

    return res.json({message: 'success', response: 'registered'}).status(200);
});

module.exports = router;