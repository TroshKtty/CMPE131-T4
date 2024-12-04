import "@/pages/accinfo/styles.css";
<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { Box, Typography, Link, Card, CardContent, Divider, Button, Input} from "@mui/joy";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function AccountInfoPage() {
=======
import { useState, useEffect } from "react";
import { Box, Typography, Link, Card, CardContent, Divider } from "@mui/joy";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

export default function AccountInfoPage() {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    createdAt: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/userInfo`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          }
        });
        
        setUserInfo({
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
          createdAt: response.data.createdAt,
        });
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

>>>>>>> 27b5565 (Card adding, removing, viewing, slecting during checkout frontend+backend)
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
<<<<<<< HEAD
          <Typography fontSize="1.5rem" fontWeight="bold" sx={{ color: "#5271ff" }}>
            Your Account
          </Typography>
          <Link component={RouterLink} to="/accinfo" sx={{ color: "#5271ff", fontSize: "1.3rem" }}>
            Personal Information
          </Link>
          <Link component={RouterLink} to="/accinfo/payment" sx={{ color: "black", fontSize: "1.3rem" }}>
            Billing & Payments
          </Link>
          <Link component={RouterLink} to="/accinfo/orders" sx={{ color: "black", fontSize: "1.3rem" }}>
=======
          <Typography
            fontSize="1.5rem"
            fontWeight="bold"
            sx={{ color: "#5271ff" }}
          >
            Your Account
          </Typography>
          <Link
            component={RouterLink}
            to="/accinfo"
            sx={{ color: "#5271ff", fontSize: "1.3rem" }}
          >
            Personal Information
          </Link>
          <Link
            component={RouterLink}
            to="/accinfo/payment"
            sx={{ color: "black", fontSize: "1.3rem" }}
          >
            Billing & Payments
          </Link>
          <Link
            component={RouterLink}
            to="/accinfo/orders"
            sx={{ color: "black", fontSize: "1.3rem" }}
          >
>>>>>>> 27b5565 (Card adding, removing, viewing, slecting during checkout frontend+backend)
            Order History
          </Link>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
<<<<<<< HEAD
          <Link component={RouterLink} to="/logout" sx={{ color: "black", fontSize: "1.3rem" }}>
=======
          <Link
            component={RouterLink}
            to="/logout"
            sx={{ color: "black", fontSize: "1.3rem" }}
          >
>>>>>>> 27b5565 (Card adding, removing, viewing, slecting during checkout frontend+backend)
            Logout
          </Link>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, padding: 4 }}>
        <Typography
          fontSize="2.5rem"
          fontWeight="bold"
          align="left"
          sx={{ color: "#5271ff" }}
        >
          Account Information
        </Typography>

<<<<<<< HEAD
        <Divider></Divider>



        <Box sx={{justifyContent: "space-between", mt: 4}}>
          {/* Info Cards */}
        
          <Card sx={{ flexGrow: 1, m: 1 }}>
            <CardContent>
                <Typography fontSize="1.3rem" fontWeight="bold">Name</Typography>
                 <Divider/>
                <Typography fontSize="1.25rem" level="body-sm">John Doe</Typography>
=======
        <Divider />

        <Box sx={{ justifyContent: "space-between", mt: 4 }}>
          {/* Info Cards */}
          <Card sx={{ flexGrow: 1, m: 1 }}>
            <CardContent>
              <Typography fontSize="1.3rem" fontWeight="bold">
                Name
              </Typography>
              <Divider />
              <Typography fontSize="1.25rem" level="body-sm">
                {userInfo.name || "Loading..."}
              </Typography>
>>>>>>> 27b5565 (Card adding, removing, viewing, slecting during checkout frontend+backend)
            </CardContent>
          </Card>
          <Card sx={{ flexGrow: 1, m: 1 }}>
            <CardContent>
<<<<<<< HEAD
              <Typography fontSize="1.3rem" fontWeight="bold">Address</Typography>
              <Divider/>
              <Typography fontSize="1.25rem" fontWeight="body-sm">1 Washington Sq, San Jose, CA 95192</Typography>
=======
              <Typography fontSize="1.3rem" fontWeight="bold">
                Email
              </Typography>
              <Divider />
              <Typography fontSize="1.25rem" fontWeight="body-sm">
                {userInfo.email || "Loading..."}
              </Typography>
>>>>>>> 27b5565 (Card adding, removing, viewing, slecting during checkout frontend+backend)
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
<<<<<<< HEAD
        <Card sx={{ flexGrow: 1, m: 1 }}>
            <CardContent>
              <Typography fontSize="1.3rem" fontWeight="bold">Username</Typography>
              <Typography fontSize="1.25rem" fontWeight="body-sm">user123</Typography>
            </CardContent>
        </Card>
        <Card sx={{ flexGrow: 1, m: 1 }}>
            <CardContent>
              <Typography fontSize="1.3rem" fontWeight="bold">Password</Typography>
              <Typography fontSize="1.2rem" fontWeight="body-sm">pw123</Typography>
            </CardContent>
          </Card>
          </Box>
      </Box>
    </Box>


=======
          <Card sx={{ flexGrow: 1, m: 1 }}>
            <CardContent>
              <Typography fontSize="1.3rem" fontWeight="bold">
                Phone
              </Typography>
              <Divider />
              <Typography fontSize="1.25rem" fontWeight="body-sm">
                {userInfo.phone || "Loading..."}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ flexGrow: 1, m: 1 }}>
            <CardContent>
              <Typography fontSize="1.3rem" fontWeight="bold">
                Account Created On
              </Typography>
              <Divider />
              <Typography fontSize="1.25rem" fontWeight="body-sm">
                {userInfo.createdAt || "Loading..."}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
>>>>>>> 27b5565 (Card adding, removing, viewing, slecting during checkout frontend+backend)
  );
}
