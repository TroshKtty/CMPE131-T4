import React from "react";
import { Typography, Link, Box } from "@mui/joy";
import { Link as RouterLink } from "react-router-dom";

export default function EmployeeSidebar() {
  return (
    <Box
      sx={{
        width: 250,
        bgcolor: "#5271ff",
        color: "common.white",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography fontSize="1.5rem" fontWeight="bold" sx={{ color: "white" }}>
          Employee Panel
        </Typography>
        <Link component={RouterLink} to="/employee/inventory-management" sx={{ color: "white", fontSize: "1rem" }}>
          Inventory Management
        </Link>
        <Link component={RouterLink} to="/employee/approval-requests" sx={{ color: "white", fontSize: "1rem" }}>
          Approval Requests
        </Link>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Link component={RouterLink} to="/employee/settings" sx={{ color: "white", fontSize: "1rem" }}>
          Settings
        </Link>
        <Link component={RouterLink} to="/logout" sx={{ color: "white", fontSize: "1rem" }}>
          Logout
        </Link>
      </Box>
    </Box>
  );
}