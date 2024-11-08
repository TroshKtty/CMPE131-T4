const express = require('express');
const { addProduct, getInventory } = require('../controllers/productController');
const router = express.Router();

router.post('/add', addProduct);
router.get('/', getInventory);

module.exports = router;
