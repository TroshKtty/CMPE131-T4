const express = require('express');
const { getCart, addToCart } = require('../controllers/cart_controller');
const router = express.Router();

router.get('/', getCart);
router.post('/addToCart', addToCart);
/*router.post('/removeFromCart', removeFromCart);
router.post('/updateQuantity', updateQuantity);*/

module.exports = router;
