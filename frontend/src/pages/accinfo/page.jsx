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
        console.log(response);
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
          <Typography
            fontSize="1.5rem"
            fontWeight="bold"
            sx={{ color: "#5271ff" }}
          >
            Your Account
          </Typography>
          <Link
            component={RouterLink}
            to="/account"
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
            to="/accinfo/address"
            sx={{ color: "black", fontSize: "1.3rem" }}
          >
            Address Info
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
            </CardContent>
          </Card>
          <Card sx={{ flexGrow: 1, m: 1 }}>
            <CardContent>
              <Typography fontSize="1.3rem" fontWeight="bold">
                Email
              </Typography>
              <Divider />
              <Typography fontSize="1.25rem" fontWeight="body-sm">
                {userInfo.email || "Loading..."}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
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
  );
}