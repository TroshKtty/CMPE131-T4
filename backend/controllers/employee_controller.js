const Users = require("../models/auth_model"); 
const Requests = require("../models/approval_model");

const employeePendingAll = async (req, res) => {
    try {
        const pendingEmployees = await Users.findAll({
            where: {
                approved: false,
                role: 'employee' 
            },
            attributes: ["user_id", "name", "email", "role", "created_at"],
        });
        res.status(200).json({ pending_users: pendingEmployees });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
  

const employeeApprovedUsers = async (req, res) => {
  try {
    const user_history = await Requests.findAll({
      where: {
        decision: true,
        role: 'employee' 
      }
    });
    res.status(200).json({ employee_history: user_history }); 
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const employeeDecision = async (req, res) => {
  const { requester_id, decision, decision_date, user_id_approver } = req.body;
  try {
    const approver = await Users.findOne({
      where: { user_id: user_id_approver },
      attributes: ["name"]
    });
    const requester = await Users.findOne({
      where: { user_id: requester_id },
      attributes: ["user_id", "role", "name"]
    });
    requester.approved = decision;
    await requester.save();

    const existingRequest = await Requests.findOne({
      where: { user_id: requester_id }
    });

    if (existingRequest) {
      await existingRequest.update({
        decision,
        approved_at: decision_date,
        approved_by_name: approver.name,
        approved_by_id: user_id_approver,
      });
    } else {
      await Requests.create({
        user_id: requester_id,
        name: requester.name,
        role: requester.role,
        decision,
        approved_at: decision_date,
        approved_by_name: approver.name,
        approved_by_id: user_id_approver,
      });
    }

    res.status(200).send("Decision recorded");
  } catch (err) {
    console.log("Something went wrong", err);
    res.status(500).send("Failed to process decision");
  }
};

const employeeRevokeAccess = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await Requests.findOne({ where: { id } });
    await Users.destroy({ where: { user_id: user.user_id } });
    await user.destroy();
    res.status(200).send("Access revoked");
  } catch (err) {
    console.log("Something went wrong", err);
    res.status(500).send("Failed to revoke access");
  }
};

module.exports = { employeePendingAll, employeeDecision, employeeApprovedUsers, employeeRevokeAccess };
