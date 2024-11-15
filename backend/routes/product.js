const { Router } = require("express");
const router = Router();

const { getAllProducts, getProduct, addProduct } = require("../controllers/products");

router.get("/all", getAllProducts);
router.get("/:id", getProduct);
router.get("/name/:name", getProduct);
router.post('/add', addProduct);
router.get('/', getInventory);

module.exports = router;
