const bodyParser = require('body-parser');
const axios = require('axios');
const CircuitBreaker = require('./middleware/circuitBreaker');
const loggingMiddleware = require('./middleware/logging');
const port = 3000;
const app = require('express')();

const circuitBreaker = new CircuitBreaker(axios);

app.use(bodyParser.json());
app.use(loggingMiddleware);

const serviceRegistryUrl = 'http://localhost:3001';

app.get('/', async (req, res) => {
  try {
    const authServiceUrl = await getServiceUrl('auth-service');
    console.log("auth service URL: ",authServiceUrl)
    const response = await circuitBreaker.request(authServiceUrl, { method: 'GET' });
    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong!!');
  }
});

async function getServiceUrl(serviceName) {
  const { data: { url } } = await axios.get(`${serviceRegistryUrl}/service/${serviceName}`,); //calling service registry api
  console.log("eewrwrwer");
  return url;
}

app.listen(port, () => {
  console.log(`API Gateway listening at http://localhost:${port}`);
});