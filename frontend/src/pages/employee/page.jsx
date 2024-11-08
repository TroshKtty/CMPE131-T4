import React from 'react';
import { Box, Typography } from '@mui/material';
import InventoryManagement from '../../components/InventoryManagement'; // Corrected path

const EmployeePage = () => {
  return (
    <>
      <Box component="nav" className="navbar">
        <Typography className="navbar-title">OFS - Employee</Typography>
      </Box>
      <Box className="employee-container">
        <Box className="employee-box">
          <Typography variant="h4">Employee Dashboard</Typography>
          <InventoryManagement />
        </Box>
      </Box>
    </>
  );
};

export default EmployeePage;