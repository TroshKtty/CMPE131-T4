import "@/pages/accinfo/styles.css";
import { useState, useEffect } from "react";
import { Box, Typography, Link, Card, CardContent, Divider } from "@mui/joy";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token"); // assuming token is stored in localStorage
        if (token) {
          const response = await axios.get("http://localhost:3000/userInfo/orders", {
            headers: {
              Authorization: `Bearer ${token}`, // sending token for auth
            },
          });
          setOrders(response.data); // Store the orders in the state
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f4f5f7" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 250,
          bgcolor: "#f4f5f7",
          color: "common.white",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography fontSize="1.5rem" fontWeight="bold" sx={{ color: "#5271ff" }}>
            Your Account
          </Typography>
          <Link component={RouterLink} to="/accinfo" sx={{ color: "black", fontSize: "1.3rem" }}>
            Personal Information
          </Link>
          <Link component={RouterLink} to="/accinfo/payment" sx={{ color: "black", fontSize: "1.3rem" }}>
            Billing & Payments
          </Link>
          <Link component={RouterLink} to="/accinfo/orders" sx={{ color: "#5271ff", fontSize: "1.3rem" }}>
            Order History
          </Link>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Link component={RouterLink} to="/logout" sx={{ color: "black", fontSize: "1.3rem" }}>
            Logout
          </Link>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, padding: 4 }}>
        <Typography fontSize="2.5rem" fontWeight="bold" align="left" sx={{ color: "#5271ff" }}>
          Order History
        </Typography>

        <Divider />

        {/* Display Orders */}
        {orders.length > 0 ? (
          orders.map((order) => (
            <Box key={order.id} sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
              <Card sx={{ flexGrow: 1, m: 1 }}>
                <CardContent>
                  <Typography fontSize="1.3rem" fontWeight="bold">
                    Order from {new Date(order.date).toLocaleDateString()} {/* Format order date */}
                  </Typography>
                  {order.items.map((item, index) => (
                    <Typography key={index} fontSize="1.25rem" fontWeight="body-sm">
                      {item.name} x{item.quantity} - ${item.price}
                    </Typography>
                  ))}
                  <Typography fontSize="1.25rem" fontWeight="body-sm">
                    Weight - {order.weight} lbs
                  </Typography>
                  {order.deliveryFee && (
                    <Typography fontSize="1.25rem" fontWeight="body-sm">
                      +${order.deliveryFee} delivery fee
                    </Typography>
                  )}
                  <Typography fontSize="1.25rem" fontWeight="body-sm">
                    <b>Total - ${order.total}</b>
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))
        ) : (
          <Typography fontSize="1.3rem" color="gray">No orders found</Typography>
        )}
      </Box>
    </Box>
  );
}
