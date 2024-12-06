const Users = require("../models/auth_model"); 
const Requests = require("../models/approval_model");
const Order = require("../models/order_model");
const OrderItem = require("../models/order_items_model");

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

// get all orders ever placed
const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem, 
          attributes: ['product_id', 'price', 'quantity'],
        },
        {
          model: Users,
          attributes: ['name'],
        },
      ],
    });

    // data for frontend
    const formattedOrders = orders.map((order) => ({
      orderId: order.id,
      placedAt: order.createdAt,
      totalPrice: order.totalPrice,
      status: order.status,
      items: order.OrderItems,
    }));

    res.status(200).json(formattedOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;

  try {
    // Validate status
    if (status !== 'Completed') {
      return res.status(400).json({ message: 'Invalid status update' });
    }

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status !== 'Placed') {
      return res.status(400).json({ message: 'Only "placed" orders can be updated' });
    }

    // Update the status
    order.status = status;
    await order.save();

    res.status(200).json({ message: 'Order status updated successfully' });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Error updating order status' });
  }
};


module.exports = { employeePendingAll, employeeDecision, employeeApprovedUsers, employeeRevokeAccess, getOrders, updateOrderStatus, };
