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

// REST
// Call Papago API
app.get("/api/translate", (req, res) => {
    res.status(200).send({
        const reponse = await fetch(// Papago URL here)
    })
});
