const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const getConnection = require('./config');
const auth_route = require('./routes/auth_routes')
getConnection();
const app = express();


app.use(express.json());
app.use(cors({origin: "http://localhost:5173",}));

//middleware


app.use('/auth', auth_route)
PORT = 3000;
//server
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
})
// Test the database connection



