const express = require("express");
const get = require("../controllers/product_test_controller");

const router = express.Router();

router.get("/getall", get);

module.exports = router;