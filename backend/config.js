//mysql library
const mysql = require('mysql');
//require('dotenv').config();
//configure connection to db
let connection = null;
function getConnection() {
  const options = {
    host: process.env.DB_IP,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
  };

  //connect to db
  if(!connection)
    connection = mysql.createConnection(options);

  //error handling
  connection.connect((error) => {
    if (error) {
      console.error('Error connecting to the database:', error);
      return;
    }
    console.log('Connected to the database successfully.');
  });

  return connection;
}

/*//test connection
function testConnection() {
  const connection = getConnection();
  connection.query('SELECT 7 * 3 AS solution', (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return;
    }
    console.log('The solution is:', results[0].solution);
    connection.end();
  });
}

testConnection();*/


module.exports = getConnection;
