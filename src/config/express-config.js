const express = require('express');
const CronJob = require('cron').job;

const limiter = require('../api/middlewares/rate-limiting.js')
const uploadLogs = require('../utils/upload-logs.js')
const routes = require('../api/routes/v1');

const app = express();

// Rate limiting
app.use(limiter);
app.set('trust proxy', 1);

// Scheduled task at 9:05AM Mountain Time every day, the time at which the Naver API limit resets.
CronJob(
  '0 5 9 * * *',
  () => {
    app.disable('quota exceeded');
    uploadLogs();
  },
  null,
  true,
  'America/Denver'
);

// Parse body parameters
app.use(express.json());

// Mount API v1 routes
app.use('/api/v1', routes);

module.exports = app;
