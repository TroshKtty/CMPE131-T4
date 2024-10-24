const express = require('express');
const router = express.Router();
const login_controller = require('../controllers/login_controller.js');  // Import the controller

router.post('/', login_controller.login);

module.exports = router;
