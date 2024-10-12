const express = require('express');
const { createOrder } = require('../controllers/cartController');
const router = express.Router();

router.post('/checkout', createOrder);

module.exports = router;
