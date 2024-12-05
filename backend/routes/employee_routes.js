const express = require("express");
const { employeePendingAll, employeeDecision, employeeApprovedUsers, employeeRevokeAccess, getOrders, updateOrderStatus } = require("../controllers/employee_controller");

const router = express.Router();

router.get("/pendingAll", employeePendingAll);
router.post("/decision", employeeDecision);
router.post("/revoke", employeeRevokeAccess);
router.get("/history", employeeApprovedUsers);
router.get("/getOrders", getOrders);
router.put("/updateOrderStatus", updateOrderStatus);

module.exports = router;
