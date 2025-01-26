const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const router = require('./routes');

const app = express();

// Load Swagger YAML file
const swaggerDocument = yaml.load('./api.yaml');

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options('*', cors());

// API routes
app.use('/api', router);

// Export app module
module.exports = app;
