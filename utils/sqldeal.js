const mysql = require('mysql');
const { mysql: mysqlConfig } = require('../config/db');

console.log("host:"+mysqlConfig.host);
console.log("user:"+mysqlConfig.user)
console.log("database:"+mysqlConfig.database)
console.log("password:"+mysqlConfig.password)
console.log("port:"+mysqlConfig.port)

const pool = mysql.createPool({
  host: mysqlConfig.host,
  user: mysqlConfig.user,
  password: mysqlConfig.password,
  database: mysqlConfig.database,
  port: mysqlConfig.port,
});

const query = function(sql, option, callback) {
  pool.getConnection(function(err, connection) {
    if (err) console.error(err)
    // Use the connection
    if (connection) {
      connection.query(sql, option, function(error, results, fields) {
        // And done with the connection.
        connection.release();
        
        // Handle error after the release.
        if (error) throw error;
        callback(err, results, fields);
        // Don't use the connection here, it has been returned to the pool.
      });
    }
  });
};

module.exports = query;
