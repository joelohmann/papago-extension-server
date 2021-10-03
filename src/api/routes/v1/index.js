const app = require('express');

const router = express.Router();

// Add authentication in each route
routes.route('/translate').get((req, res) => {
    const reponse = async () => { // await fetch((papago api url),
        // method: 'GET'
        // body: data
        // headers: {
        //     client secret
        //     client id
        // })
    };

    res.status(200).send({
        debug: true,
        secrets: process.env.CLIENT_ID
    })
});

module.exports = router;
