const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3003;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Auth Service is working');
});

app.listen(port, () => {
  console.log(`Auth Service listening at http://localhost:${port}`);
});
