const express = require('express');
const routes = require('../api/routes/v1');

const app = express();

// Parse body parameters
app.use(express.json());

// Mount API v1 routes
app.use('api/v1', routes);

module.exports = app;
