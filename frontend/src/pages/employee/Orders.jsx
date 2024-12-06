import { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Divider, Box } from "@mui/joy";
import axios from "axios";
import EmployeeSidebar from "@/components/employee_navbar/employee_navbar";

const EmployeeOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null); // Track which order is expanded
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  // all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/employees/getOrders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [token]);

  // changing order status
  const updateOrderStatus = async (orderId) => {
    try {
      await axios.put(
        `http://localhost:3000/employees/updateOrderStatus`,
        { status: "Completed", orderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, status: "Completed" } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", padding: 2 }}>
      <Box
        sx={{
          width: "250px",
          flexShrink: 0,
        }}
      >
        <EmployeeSidebar />
      </Box>

      <Box sx={{ flexGrow: 1, marginLeft: 2 }}>
        <Typography level="h2" sx={{ marginBottom: 2 }}>
          Employee Order Management
        </Typography>
        {orders.length === 0 ? (
          <Typography>No orders found.</Typography>
        ) : (
          <div>
            {orders.map((order) => (
              <Card
                key={order.orderId}
                variant="outlined"
                sx={{ marginBottom: 2 }}
              >
                <CardContent>
                  <Typography level="h5">Order #{order.orderId}</Typography>
                  <Typography>
                    Placed on: {new Date(order.placedAt).toLocaleString()}
                  </Typography>
                  <Typography>Total Price: ${order.totalPrice}</Typography>

                  {/* Toggle Details */}
                  <Button
                    onClick={() =>
                      setExpandedOrder(
                        expandedOrder === order.orderId ? null : order.orderId
                      )
                    }
                    variant="outlined"
                    sx={{ mt: 1 }}
                  >
                    {expandedOrder === order.orderId
                      ? "Hide Details"
                      : "Show Details"}
                  </Button>

                  {/* Show details if expanded */}
                  {expandedOrder === order.orderId && (
                    <>
                      <Divider sx={{ my: 2 }} />
                      <Typography>Status: {order.status}</Typography>
                      <Divider sx={{ my: 2 }} />
                      <Typography>Items:</Typography>
                      {order.items.map((item, index) => (
                        <Typography key={index}>
                          {item.product_id} - ${item.price} x {item.quantity}
                        </Typography>
                      ))}
                      {order.status === "Placed" && (
                        <Button
                          onClick={() => updateOrderStatus(order.orderId)}
                          variant="contained"
                          color="success"
                          sx={{ mt: 2 }}
                        >
                          Mark as Completed
                        </Button>
                      )}
                      {order.status === "Completed" && (
                        <Typography color="success" sx={{ mt: 2 }}>
                          Order is Completed
                        </Typography>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Box>
    </Box>
  );
};

export default EmployeeOrderPage;
