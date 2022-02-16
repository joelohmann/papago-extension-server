const express = require('express');
const limiter = require('../api/middlewares/rate.limiting.js')
const routes = require('../api/routes/v1');

const app = express();

// Rate limiting
app.use(limiter);
app.set('trust proxy', 1);

// Parse body parameters
app.use(express.json());

// Mount API v1 routes
app.use('/api/v1', routes);

module.exports = app;
