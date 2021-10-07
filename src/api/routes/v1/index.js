const express = require('express');

const translate = require('../../services/translate.service.js');

const router = express.Router();

router.route('/status').get((req, res) => {
    res.send({
        message: "OK",
        time: new Date().toISOString(),
        IP: req.ip,
        URL: req.originalURL
    });
});

// TODO Add authentication in each route
router.route('/translate').post((req, res) => {
    translate(JSON.stringify(req.body))
    .then((data) => res.status(200).send(data))
});

module.exports = router;
