import "@/pages/accinfo/styles.css";
import React, { useState, useEffect } from "react";
import { Box, Typography, Link, Card, CardContent, Divider, Button, Input} from "@mui/joy";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function AccountInfoPage() {
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
          <Link component={RouterLink} to="/accinfo" sx={{ color: "#5271ff", fontSize: "1.3rem" }}>
            Personal Information
          </Link>
          <Link component={RouterLink} to="/accinfo/payment" sx={{ color: "black", fontSize: "1.3rem" }}>
            Billing & Payments
          </Link>
          <Link component={RouterLink} to="/accinfo/orders" sx={{ color: "black", fontSize: "1.3rem" }}>
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
        <Typography
          fontSize="2.5rem"
          fontWeight="bold"
          align="left"
          sx={{ color: "#5271ff" }}
        >
          Account Information
        </Typography>

        <Divider></Divider>



        <Box sx={{justifyContent: "space-between", mt: 4}}>
          {/* Info Cards */}
        
          <Card sx={{ flexGrow: 1, m: 1 }}>
            <CardContent>
                <Typography fontSize="1.3rem" fontWeight="bold">Name</Typography>
                 <Divider/>
                <Typography fontSize="1.25rem" level="body-sm">John Doe</Typography>
            </CardContent>
          </Card>
          <Card sx={{ flexGrow: 1, m: 1 }}>
            <CardContent>
              <Typography fontSize="1.3rem" fontWeight="bold">Address</Typography>
              <Divider/>
              <Typography fontSize="1.25rem" fontWeight="body-sm">1 Washington Sq, San Jose, CA 95192</Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
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


  );
}
