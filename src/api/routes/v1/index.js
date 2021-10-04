const express = require('express');
const translate = require('../../services/translate.service.js');

const router = express.Router();

// TODO Add authentication in each route
// router.route('/translate').post((req, res) => {
//     console.log(req.body);
//
//     let translation = translate(req.body);
//     console.log(translation);
//     res.status(200).send(translation);
// });

// TODO remove this
router.route('/test').get((req, res) => {
    res.status(200).send({
        test: 'hello'
    })
});

console.log("v1/index")

module.exports = router;
