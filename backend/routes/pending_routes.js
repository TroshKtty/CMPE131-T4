const express = require("express");
const {pendingAll, decision, approved_users, revoke_access} = require("../controllers/pending_controller");

const router = express.Router();

router.get("/pendingAll", pendingAll);
router.post("/decision", decision);
router.post("/revoke_access", revoke_access);
router.get("/approved_users", approved_users);

module.exports = router;