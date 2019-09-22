'use strict';

const express = require('express');

const app = express();
const port = 8010;

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const buildSchemas = require('./src/schemas');

const logger = require('./src/logger');

db.serialize(() => {
  buildSchemas(db);

  const app = require('./src/app')(db, logger);

  app.listen(port, () => logger.info(`Rides API Service started and listening on port ${port}`));
});
