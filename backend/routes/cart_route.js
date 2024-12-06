const express = require('express');
const { getCart, addToCart, removeFromCart, updateCount} = require('../controllers/cart_controller');
const router = express.Router();

router.get('/', getCart);
router.post('/addToCart', addToCart);
router.post('/removeFromCart', removeFromCart);
router.post('/updateCount', updateCount);

module.exports = router;
