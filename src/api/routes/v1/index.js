const express = require('express');

const detect = require('../../services/detect.js');
const translate = require('../../services/translate.js');

const router = express.Router();

router.route('/status').get((req, res) => {
    res.send({
        message: "OK",
        time: new Date().toISOString(),
        IP: req.ip,
        URL: req.originalUrl
    });
});

// TODO Add authentication in each route
// TODO Add .catch clauses to each call
router.route('/detect').post((req, res) => {
    detect(JSON.stringify(req.body))
    .then((data) => res.status(200).send(data))
});

router.route('/translate').post((req, res) => {
    translate(JSON.stringify(req.body))
    .then((data) => res.status(200).send(data))
});

module.exports = router;
