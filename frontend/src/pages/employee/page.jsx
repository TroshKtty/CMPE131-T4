import React from "react";
import { Box, Typography } from "@mui/joy";
import EmployeeSidebar from "@/components/employee_navbar/employee_navbar"; // Ensure the path is correct

export default function EmployeeDashboardPage() {
  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f4f5f7" }}>
      <EmployeeSidebar /> {/* Reused sidebar component */}
      <Box sx={{ flexGrow: 1, padding: 4 }}>
        <Typography
          fontSize="2.5rem"
          fontWeight="bold"
          align="center"
          sx={{ color: "#0c6cba" }}
        >
          Employee Dashboard
        </Typography>
      </Box>
    </Box>
  );
}
