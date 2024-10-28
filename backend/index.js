const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const connection = require('./config');
const token = require('./middleware/auth');
const auth_route = require('./routes/auth_routes');
require('dotenv').config();

const app = express();


app.use(express.json());
app.use(cors({origin: "http://localhost:5173",}));

//middleware


app.use('/auth', auth_route)
const PORT = 3000;
//server
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
})



