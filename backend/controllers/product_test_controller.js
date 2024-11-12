const Product = require('../models/product_test');
require('dotenv').config();

const get = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } 
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

module.exports = get;