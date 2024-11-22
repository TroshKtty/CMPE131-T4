const Product = require("../models/product");

const addProduct = async (req, res) => {
  try {
    const { name, price, weight, quantity } = req.body;
    const product = await Product.create({ name, price, weight, quantity });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to add product" });
  }
};

const getAllProducts = async (_, res) => {
  try {
    const products = await Product.findAll({
      attributes: ['id', 'name', 'price', 'weight', 'category', 'images', 'quantity']
    });
    res.status(200).json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    res.status(500).json({ error: "Failed to fetch all products" });
  }
};


const getProduct = async (req, res) => {
  try {
    const { id, name } = req.params;

    let product;

    if (id) {
      product = await Product.findByPk(id);
    } else if (name) {
      product = await Product.findOne({ where: { name } });
    } else {
      return res
        .status(400)
        .json({ error: "Either 'id' or 'name' must be provided" });
    }

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log("An error occurred while fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, weight, quantity } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.name = name;
    product.price = price;
    product.weight = weight;
    product.quantity = quantity;

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.destroy();
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};


module.exports = {
  addProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct
};