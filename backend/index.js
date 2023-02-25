const express = require('express');
const mainRouter = require('./routes/router.js');
const bodyParser = require('body-parser');
const session = require('express-session');
const server = express();

server.use(bodyParser.urlencoded({
    extended: false
}));

server.use(bodyParser.json());

server.use(session({
    secret: 'VerySecretPGkeyInSessionsStoringCookies123128418258!""#"#@@@@',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: false
    }
}));

server.use('/api', mainRouter);

server.use('*', (req, res) => {
    console.log(req.session)
    res.json({
        message: 'Endpoint invalid'
    }).status(403);
});

server.listen(4000, () => console.log(`[BACKEND] <==> || Successfully started Backend Server! || <==> [BACKEND]`));