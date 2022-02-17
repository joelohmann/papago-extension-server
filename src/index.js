const { port, env } = require('./constants')
const app = require('./config/express-config.js');
const logger = require('./utils/logger.js');
// const process = require('process');
// require(logHandler)


// Declaring port. Heroku generally will choose its own port
app.listen(port, (err) => {
    if (err) {
        logger.error(err);
        return console.log(err);
    }
    
    logger.info(`server started [env, port] = [${env}, ${port}]`);
    return console.log(`server started [env, port] = [${env}, ${port}]`)
});

// Handler for offloading logs before Heroku 
// process.on('SIGTERM', logHandler);
