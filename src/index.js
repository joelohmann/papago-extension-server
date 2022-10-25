const { port, env } = require('./constants')
const app = require('./config/express-config.js');
const logger = require('./utils/logger.js');
const sigtermHandler = require('./utils/sigterm-handler');


// Declaring port. Heroku generally will choose its own port
app.listen(port, (err) => {
    if (err) {
        logger.error(err);
        return console.log(err);
    }

    return logger.info(`server started [env, port] = [${env}, ${port}]`);
});

if (env === 'production') {
    // Handler for offloading logs before Heroku 
    process.on('SIGTERM', sigtermHandler);
}

// Heroku uses SIGTERM, but use SIGINT for debugging
// process.on('SIGINT', sigtermHandler);
