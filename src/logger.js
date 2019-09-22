'use strict';

const winston = require('winston');
const WinstonDailyRotateFile = require('winston-daily-rotate-file');

const logFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(
    info => `${info.timestamp} ${info.level}: ${info.error_code} - ${info.message}`
  )
);
const logger = winston.createLogger({
  format: logFormat,
  defaultMeta: { service: 'ride-service' },
  transports: [
    new WinstonDailyRotateFile({
      filename: './logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error'
    }),
    new WinstonDailyRotateFile({
      filename: './logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD'
    })
  ]
});

module.exports = logger;
