'use strict';

const express = require('express');
const app = express();
const port = 8000;

const swaggerUi = require("swagger-ui-express");

const YAML = require('yamljs');
const swaggerDocument = YAML.load('./ApiDoc.yaml');
 
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => console.log(`API Documentation Server started and listening on port ${port}`));