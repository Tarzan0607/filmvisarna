const express = require('express');
const mainRouter = require('./routes/router.js');
const bodyParser = require('body-parser');
const server = express();

server.use(bodyParser.urlencoded({ extended: false }));

server.use(bodyParser.json());

server.use('/api', mainRouter);

server.use('*', (req, res) => {
    res.json({message: 'Endpoint invalid'}).status(403);
});

server.listen(4000, () => console.log(`[BACKEND] <==> || Successfully started Backend Server! || <==> [BACKEND]`));