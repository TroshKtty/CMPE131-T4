const express = require("express");
const {pendingAll, pendingEmp, decision} = require("../controllers/pending_controller");

const router = express.Router();

router.post("/pendingAll", pendingAll);
router.post("/pendingEmp", pendingEmp);
router.post("/decision", decision);
module.exports = router;