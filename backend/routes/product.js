const { Router } = require("express");
const router = Router();

const {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/products");

// Route to get all products
router.get("/all", getAllProducts);

// Routes to get a product by ID or name
router.get("/:id", getProduct);  // Handles fetching by ID
router.get("/name/:name", getProduct);  // Handles fetching by name

// Route to add a new product
router.post('/', addProduct);

// Route to update a product
router.put("/:id", updateProduct);

// Route to delete a product
router.delete("/:id", deleteProduct);

module.exports = router;
