const express = require('express');
const apicache = require('apicache');

const detect = require('../../services/detect.js');
const translate = require('../../services/translate.js');
const logger = require('../../../utils/logger.js');

// Init cache
var cache = apicache.middleware;

const router = express.Router();

router.route('/status').get((req, res) => {
    res.send({
        message: "OK",
        time: new Date().toISOString(),
        IP: req.ip,
        URL: req.originalUrl
    });
});

router.route('/detect').get(cache('5 minutes'), (req, res) => {
    detect(req.app, req.query)
    .then(({status, data}) => res.status(status).send(data))
    .catch(err => {
        // Something went wrong on my end. Naver response was okay.
        res.status(500).send(err);
        logger.error(err);
    });
});

router.route('/translate').get(cache('5 minutes'), (req, res) => {
    translate(req.app, req.query)
    .then(({status, data}) => res.status(status).send(data))
    .catch(err => {
        // Something went wrong on my end. Naver response was okay.
        res.status(500).send(err);
        logger.error(err);
    });
});

module.exports = router;
