const bodyParser = require('body-parser');
const app = require('express')();
const port = 3001;

const services = [
  { name: 'auth-service', url: 'http://localhost:3003' },
  // add other services here
];

app.use(bodyParser.json());

app.get('/service/:serviceName', (req, res) => {
  console.log(req.params.serviceName)
  const serviceName = req.params.serviceName;
  const service = services.find(s => s.name === serviceName);
  if (!service) {
    return res.status(404).send(`Service ${serviceName} not found`);
  }
  res.send(service);
});

app.listen(port, () => {
  console.log(`Service Registry listening at http://localhost:${port}`);
});
