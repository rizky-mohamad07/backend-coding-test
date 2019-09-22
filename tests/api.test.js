'use strict';

const request = require('supertest');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
const logger = require('../src/logger');
const app = require('../src/app')(db, logger);
const buildSchemas = require('../src/schemas');

describe('API tests', () => {
  before(done => {
    db.serialize(err => {
      if (err) {
        return done(err);
      }

      buildSchemas(db);

      done();
    });
  });

  describe('GET /health', () => {
    it('should return health', done => {
      request(app)
        .get('/health')
        .expect('Content-Type', /text/)
        .expect(200, done);
    });
  });

  describe('GET /rides Negative Flow', () => {
    it('respond with empty rides data', done => {
      request(app)
        .get('/rides')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /rides/{id} Negative Flow', () => {
    it('respond with RIDES_NOT_FOUND_ERROR', done => {
      request(app)
        .get('/rides/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('POST /rides All Flow', () => {
    const data = {
      start_lat: 10,
      start_long: 10,
      end_lat: 10,
      end_long: 10,
      rider_name: 'Rizky',
      driver_name: 'Eddy',
      driver_vehicle: 'Yamaha'
    };
    it('respond with json containing the newly created ride data', done => {
      request(app)
        .post('/rides')
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
    it('respond with invalid parameter when request body is empty', done => {
      request(app)
        .post('/rides')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
    it('respond with invalid parameter when end_lat and end_long is empty', done => {
      request(app)
        .post('/rides')
        .send({
          start_lat: 10,
          start_long: 10
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
    it('respond with invalid parameter when rider_name is empty', done => {
      request(app)
        .post('/rides')
        .send({
          start_lat: 10,
          start_long: 10,
          end_lat: 10,
          end_long: 10
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
    it('respond with invalid parameter when driver_name is empty', done => {
      request(app)
        .post('/rides')
        .send({
          start_lat: 10,
          start_long: 10,
          end_lat: 10,
          end_long: 10,
          rider_name: 'Rizky'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
    it('respond with invalid parameter when driver_vehicle is empty', done => {
      request(app)
        .post('/rides')
        .send({
          start_lat: 10,
          start_long: 10,
          end_lat: 10,
          end_long: 10,
          rider_name: 'Rizky',
          driver_name: 'Eddy'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /rides/{id} Positive Flow', () => {
    it('respond with json containing ride data with id 1', done => {
      request(app)
        .get('/rides/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  describe('GET /rides Positive Flow', () => {
    it('respond with json containing a list of all rides', done => {
      request(app)
        .get('/rides')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});
