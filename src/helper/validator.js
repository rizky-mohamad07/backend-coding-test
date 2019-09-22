'use strict';

module.exports.validateRideData = async function(rideData, logger) {
  const startLatitude = Number(rideData.start_lat);
  const startLongitude = Number(rideData.start_long);
  const endLatitude = Number(rideData.end_lat);
  const endLongitude = Number(rideData.end_long);
  const riderName = rideData.rider_name;
  const driverName = rideData.driver_name;
  const driverVehicle = rideData.driver_vehicle;

  let validationResponse = '';

  if (startLatitude < -90 || startLatitude > 90 || startLongitude < -180 || startLongitude > 180) {
    logger.error({
      error_code: 'VALIDATION_ERROR',
      message:
        'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
    });
    validationResponse = {
      error_code: 'VALIDATION_ERROR',
      message:
        'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
    };
  }

  if (endLatitude < -90 || endLatitude > 90 || endLongitude < -180 || endLongitude > 180) {
    logger.error({
      error_code: 'VALIDATION_ERROR',
      message:
        'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
    });
    validationResponse = {
      error_code: 'VALIDATION_ERROR',
      message:
        'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
    };
  }

  if (typeof riderName !== 'string' || riderName.length < 1) {
    logger.error({
      error_code: 'VALIDATION_ERROR',
      message: 'Rider name must be a non empty string'
    });
    validationResponse = {
      error_code: 'VALIDATION_ERROR',
      message: 'Rider name must be a non empty string'
    };
  }

  if (typeof driverName !== 'string' || driverName.length < 1) {
    logger.error({
      error_code: 'VALIDATION_ERROR',
      message: 'Driver name must be a non empty string'
    });
    validationResponse = {
      error_code: 'VALIDATION_ERROR',
      message: 'Driver name must be a non empty string'
    };
  }

  if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
    logger.error({
      error_code: 'VALIDATION_ERROR',
      message: 'Driver vehicle must be a non empty string'
    });
    validationResponse = {
      error_code: 'VALIDATION_ERROR',
      message: 'Driver vehicle must be a non empty string'
    };
  }
  return validationResponse;
};

module.exports.validateRidePaginationParameter = async function(paginationParameter, logger) {
  const page = Number(paginationParameter.page);
  const limit = Number(paginationParameter.limit);

  let validationResponse = '';

  if (!page || page < 1) {
    logger.error({
      error_code: 'VALIDATION_ERROR',
      message: 'Page Parameter should be greater than 0'
    });
    validationResponse = {
      error_code: 'VALIDATION_ERROR',
      message: 'Page Parameter should be greater than 0'
    };
  }

  if (!limit || limit < 1 || limit >= 50) {
    logger.error({
      error_code: 'VALIDATION_ERROR',
      message: 'Limit Parameter should be between 1 and 50'
    });
    validationResponse = {
      error_code: 'VALIDATION_ERROR',
      message: 'Limit Parameter should be between 1 and 50'
    };
  }
  return validationResponse;
};
