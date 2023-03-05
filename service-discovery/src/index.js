const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const port = 3002;

app.use(bodyParser.json());

app.post('/discover', (req, res) => {
  const { serviceName, port } = req.body;
  console.log(serviceName, port);
  exec(`docker-compose exec api-gateway curl -X PUT http://localhost:3000/service-registry/service/${serviceName} -d '{"url": "http://${serviceName}:${port}"}'`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Something went wrong!!!');
    }
    console.log(stdout);
    console.error(stderr);
    res.send('Service registered successfully');
  });
});

app.listen(port, () => {
  console.log(`Service Discovery listening at http://localhost:${port}`);
});
