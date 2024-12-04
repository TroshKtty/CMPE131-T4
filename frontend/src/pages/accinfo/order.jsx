import "@/pages/accinfo/styles.css";
import React from "react";
import { Box, Typography, Link, Card, CardContent, Divider, Button} from "@mui/joy";
import { Link as RouterLink } from "react-router-dom";

export default function OrderHistoryPage() {
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
        <Typography
          fontSize="2.5rem"
          fontWeight="bold"
          align="left"
          sx={{ color: "#5271ff" }}
        >
          Order History
        </Typography>

        <Divider></Divider>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Card sx={{ flexGrow: 1, m: 1 }}>
              <CardContent>
                <Typography fontSize="1.3rem" fontWeight="bold">Order from 10/2/24</Typography>
                <Typography fontSize="1.25rem" fontWeight="body-sm">Foster Farms Farm Whole Chicken x1 - $5.00 </Typography>
                <Typography fontSize="1.25rem" fontWeight="body-sm">Marketside Fresh Spinach, 10 oz Bag, Fresh x1 - $2.28 </Typography>
                <Typography fontSize="1.25rem" fontWeight="body-sm">Weight - 7 lbs </Typography>
                <Typography fontSize="1.25rem" fontWeight="body-sm"><b>Total - $7.28</b> </Typography>
              </CardContent>
          </Card>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Card sx={{ flexGrow: 1, m: 1 }}>
              <CardContent>
              <Typography fontSize="1.3rem" fontWeight="bold">Order from 11/16/24</Typography>
                <Typography fontSize="1.25rem" fontWeight="body-sm">Fresh Whole Russet Potatoes, 5lb bag x2 - $6.48 </Typography>
                <Typography fontSize="1.25rem" fontWeight="body-sm">Ground Beef Chuck, 4.5 lb Tray, Fresh, All Natural x1 - $26.43 </Typography>
                <Typography fontSize="1.25rem" fontWeight="body-sm">Pork Center Cut Loin Chops Boneless Family Pack x1 - $14.64 </Typography>
                <Typography fontSize="1.25rem" fontWeight="body-sm">Weight - 20.5 lbs, +$5 delivery fee </Typography>
                <Typography fontSize="1.25rem" fontWeight="body-sm"><b>Total - $52.55</b> </Typography>
              </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>


  );
}
