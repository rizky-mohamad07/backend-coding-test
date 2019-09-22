'use strict';

const express = require('express');

const app = express();
const port = 8010;

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database(':memory:');

const buildSchemas = require('./src/schemas');

const logger = require('./src/logger');
const validator = require('./src/helper/validator');
const dbHelper = require('./src/helper/dbHelper');

db.serialize(() => {
  buildSchemas(db);

  const app = require('./src/app')(db, logger, validator, dbHelper);

  app.listen(port, () => logger.info(`Rides API Service started and listening on port ${port}`));
});
