const express = require("express");
const register = require("../controllers/auth_controller");

const router = express.Router();

router.post("/register", register);
//router.post("/login", login);

module.exports = router;