const {createLogger, format, transports} = require('winston');
const {combine, timestamp, json} = format;

const logger = createLogger({
  level: 'http',
  format: combine(
    timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    json()
  ),
  transports: [
    new transports.File({
      filename: 'logs/error.log', 
      level: 'error'
    }),
    new transports.File({
      filename: 'logs/combined.log'
    })
  ]
});

// Log to console when not in production
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple()
  }));
}

module.exports = logger;
