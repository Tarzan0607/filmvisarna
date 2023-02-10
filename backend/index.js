const express =  require('express');
const mainRouter = require('./routes/router.js');
const server = express();

require('./utilities/anticrash.js');

server.use('/api', mainRouter);

server.listen(4000, () => console.log(`[BACKEND] <==> || Successfully started Backend Server! || <==> [BACKEND]`));