// const Product = require('../models/product');

// const addProduct = async (req, res) => {
//   try {
//     const { name, price, weight, quantity } = req.body;
//     const product = await Product.create({ name, price, weight, quantity });
//     res.status(201).json(product);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to add product' });
//   }
// };

// const getInventory = async (req, res) => {
//   try {
//     console.log('getInventory function called');
//     const products = await Product.findAll();
//     res.json(products);
//   } catch (error) {
//     console.error('Error in getInventory:', error);
//     res.status(500).json({ error: 'Failed to retrieve inventory' });
//   }
// };

// module.exports = { addProduct, getInventory };
