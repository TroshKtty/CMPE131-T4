const express = require("express");
const { employeePendingAll, employeeDecision, employeeApprovedUsers, employeeRevokeAccess } = require("../controllers/employee_controller");

const router = express.Router();

router.get("/pendingAll", employeePendingAll);
router.post("/decision", employeeDecision);
router.post("/revoke", employeeRevokeAccess);
router.get("/history", employeeApprovedUsers);

module.exports = router;
