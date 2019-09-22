'use strict';

const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

module.exports = (db, logger, validator, dbHelper) => {
  app.get('/health', (req, res) => res.send('Healthy'));

  app.post('/rides', jsonParser, async (req, res) => {
    logger.info('POST /rides is called');
    const validateResult = await validator.validateRideData(req.body, logger);
    if (validateResult !== '') {
      return res.send(validateResult);
    }
    const values = [
      req.body.start_lat,
      req.body.start_long,
      req.body.end_lat,
      req.body.end_long,
      req.body.rider_name,
      req.body.driver_name,
      req.body.driver_vehicle
    ];

    let insertRideResponse = '';
    try {
      const sql = `INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      insertRideResponse = await dbHelper.runAsync(db, sql, values);
    } catch (e) {
      logger.error({
        error_code: 'SERVER_ERROR',
        message: 'Unknown Error'
      });
      return res.send({
        error_code: 'SERVER_ERROR',
        message: 'Unknown Error'
      });
    }

    let rideData = '';
    try {
      const sql = `SELECT * FROM Rides WHERE rideID = ?`;
      rideData = await dbHelper.allAsync(db, sql, insertRideResponse.lastID);
    } catch (e) {
      logger.error({
        error_code: 'SERVER_ERROR',
        message: 'Unknown Error'
      });
      return res.send({
        error_code: 'SERVER_ERROR',
        message: 'Unknown Error'
      });
    }
    res.send(rideData);
    logger.info('POST /rides is successfully finished');
  });

  app.get('/rides', async (req, res) => {
    logger.info('GET /rides is called');
    const validateResult = await validator.validateRidePaginationParameter(req.query, logger);
    if (validateResult !== '') {
      return res.send(validateResult);
    }

    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const offset = (page - 1) * limit;
    const values = [limit, offset];

    let ridesData = '';
    try {
      const sql = `SELECT * FROM Rides LIMIT ? OFFSET ?`;
      ridesData = await dbHelper.allAsync(db, sql, values);
    } catch (e) {
      logger.error({
        error_code: 'SERVER_ERROR',
        message: 'Unknown Error'
      });
    }
    if (ridesData.length === 0) {
      logger.error({
        error_code: 'RIDES_NOT_FOUND_ERROR',
        message: 'Could not find any rides'
      });
      return res.send({
        error_code: 'RIDES_NOT_FOUND_ERROR',
        message: 'Could not find any rides'
      });
    }
    let ridesCount = '';
    try {
      const sql = `SELECT COUNT(*) as TotalCount FROM Rides`;
      ridesCount = await dbHelper.allAsync(db, sql);
    } catch (e) {
      logger.error({
        error_code: 'SERVER_ERROR',
        message: 'Unknown Error'
      });
    }
    if (ridesCount.length === 0) {
      logger.error({
        error_code: 'TOTAL_RIDES_COUNT_ERROR',
        message: 'Failed fetching total rides count data'
      });
      return res.send({
        error_code: 'RIDES_NOT_FOUND_ERROR',
        message: 'Failed fetching total rides count data'
      });
    }
    const response = {
      page: req.query.page,
      limit: req.query.limit,
      count: ridesCount[0].TotalCount,
      data: ridesData
    };
    res.send(response);
    logger.info('GET /rides is successfully finished');
  });

  app.get('/rides/:id', async (req, res) => {
    logger.info('GET /rides/{id} is called');
    const rideId = Number(req.params.id);
    let rideData = '';
    try {
      const sql = `SELECT * FROM Rides WHERE rideID=?`;
      rideData = await dbHelper.allAsync(db, sql, rideId);
    } catch (e) {
      logger.error({
        error_code: 'SERVER_ERROR',
        message: 'Unknown Error'
      });
    }
    if (rideData.length === 0) {
      logger.error({
        error_code: 'RIDES_NOT_FOUND_ERROR',
        message: 'Could not find any rides'
      });
      return res.send({
        error_code: 'RIDES_NOT_FOUND_ERROR',
        message: 'Could not find any rides'
      });
    }
    res.send(rideData);
    logger.info('GET rides/{id} successfully finished');
  });

  return app;
};
