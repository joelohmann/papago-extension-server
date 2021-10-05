const express = require('express');
const translate = require('../../services/translate.service.js');

const router = express.Router();

// TODO Add authentication in each route
router.route('/translate').post((req, res) => {
    translate(JSON.stringify(req.body))
    .then((data) => res.status(200).send(data))
});

module.exports = router;
