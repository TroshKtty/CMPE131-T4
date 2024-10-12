const Product = require('../models/product');

const addProduct = async (req, res) => {
  try {
    const { name, price, weight, quantity } = req.body;
    const product = await Product.create({ name, price, weight, quantity });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
};

module.exports = { addProduct };
