const express = require('express');
const Router = require('./src/routes/router');
const app = express();

app.use(express.json());
app.use('/app', Router);

app.get('/', (req, res) => {
  res.send("Welcome to gmail api app")
})

app.listen(8000, () => {
  console.log("server listening on port 8000")
});