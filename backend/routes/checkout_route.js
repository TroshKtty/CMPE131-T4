const express = require('express');
const { createOrder } = require('../controllers/checkout_controller');
const router = express.Router();

router.post('/createOrder', createOrder);

module.exports = router;
