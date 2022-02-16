const rateLimit = require('express-rate-limit');

// Rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20
});

module.exports = limiter;