const { port, env } = require('./constants')
const app = require('./config/express.config');

// TODO Remove
app.get('/test', (req, res) => {
  res.status(200).send({
      test: 'hello'
  })
});

// Declaring port. Heroku generally will choose its own port
app.listen(port, (err) => {
    if (err) {
        return console.log(err);
    }
        return console.log(`server started [env, port] = [${env}, ${port}]`)
});
