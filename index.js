const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to convert all requests to json
app.use(express.json());

// Declaring port. Heroku generally will choose its own port
app.listen(
    PORT,
    () => console.log(`server listening on http://localhost:${PORT}`)
)

// // Routes
// app.get('/', (req, res) => {
//     res.status(200).send({
//         const
//     })
// });

app.get("/api/translate", (req, res) => {
    const reponse = await fetch("http://www.google.com")// Papago URL here
    res.status(200).send({
        debug: true
    })
});
