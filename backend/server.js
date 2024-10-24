const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./config');
//const bcrypt = require('bcryptjs');
const loginRoute = require('./routes/login_route');

const app = express();
app.use(bodyParser.json());


// Use the login route under the '/api' path
app.use('/api/login', loginRoute);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
})



