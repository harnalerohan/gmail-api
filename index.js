const express = require('express');
const Router = require('./src/routes/router');
const app = express();
var cors = require('cors')

app.use(cors())
app.use(express.json());
app.use('/app', Router);

app.get('/', (req, res) => {
  res.send("Welcome to gmail api app")
})

const PORT = process.env.PORT | 5000;

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
});
