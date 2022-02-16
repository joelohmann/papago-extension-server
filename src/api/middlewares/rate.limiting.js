const rateLimit = require('express-rate-limit');

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5
});

module.exports = limiter;