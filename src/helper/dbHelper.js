'use strict';

module.exports.allAsync = function(db, sql, param) {
  return new Promise((resolve, reject) => {
    db.all(sql, param, function(err, rows) {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
};

module.exports.runAsync = function(db, sql, param) {
  return new Promise((resolve, reject) => {
    db.run(sql, param, function(err) {
      if (err) {
        reject(err);
      }
      resolve(this);
    });
  });
};
