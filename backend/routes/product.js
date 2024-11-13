const { Router } = require("express");
const router = Router();

// const { addProduct } = require("../controllers/products");

const { getAllProducts, getProduct } = require("../controllers/products");

router.get("/all", getAllProducts);
router.get("/:id", getProduct);
router.get("/name/:name/", getProduct);

// router.post('/add', addProduct);

module.exports = router;
