const path = require('path');
// Import .env variables
require('dotenv').config({
    path: path.join(__dirname, '../../.env')
});

const common = {
    port: process.env.PORT || 8080,
    env: process.env.NODE_ENV
};

module.exports = common;
