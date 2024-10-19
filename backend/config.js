//mysql library
const mysql = require('mysql');

//configure connection to db
function getConnection() {
  const options = {
    host: "34.173.36.191",
    user: "root",
    password: "OFS@2024",
    database: "OFS"
  };

  //connect to db
  const connection = mysql.createConnection(options);

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

//test connection
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

testConnection();
