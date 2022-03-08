const express = require('express');

const detect = require('../../services/detect.js');
const translate = require('../../services/translate.js');
const logger = require('../../../utils/logger.js');

const router = express.Router();

router.route('/status').get((req, res) => {
    res.send({
        message: "OK",
        time: new Date().toISOString(),
        IP: req.ip,
        URL: req.originalUrl
    });
});

router.route('/detect').post((req, res) => {
    detect(req.body)
    .then(({status, data}) => res.status(status).send(data))
    .catch(err => {
        // Something went wrong on my end. Naver response was okay.
        res.status(500).send(err);
        logger.error(err);
    });
});

router.route('/translate').post((req, res) => {
    translate(req.body)
    .then(({status, data}) => res.status(status).send(data))
    .catch(err => {
        // Something went wrong on my end. Naver response was okay.
        res.status(500).send(err);
        logger.error(err);
    });
});

module.exports = router;
