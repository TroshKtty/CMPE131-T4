import React from "react";
import { Box, Typography, Link, Card, CardContent } from "@mui/joy";
import { Link as RouterLink } from "react-router-dom";
import Chart from "react-apexcharts"; // Make sure this package is installed

export default function AdminDashboardPage() {
  // Example data for the charts
  const salesData = {
    series: [{
      name: 'Sales',
      data: [4500, 6500, 8000, 7200]
    }],
    options: {
      chart: {
        type: 'line',
        height: 350
      },
      stroke: {
        width: 7,
        curve: 'smooth'
      },
      xaxis: {
        categories: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4']
      },
      markers: {
        size: 5
      },
      colors: ['#20E647'], // Green color
    }
  };

  const categoryData = {
    series: [38.8, 22.9, 23, 15.3],
    options: {
      labels: ['Fruits and Vegetables', 'Snacks', 'Meat and Seafood', 'Others'],
      colors: ['#FF4560', '#00E396', '#008FFB', '#775DD0'], // Example colors for categories
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true
            }
          }
        }
      }
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f4f5f7" }}>
      {/* Sidebar */}
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
          <Typography level="h2" fontSize="lg" textColor="common.white">
            Dashboard
          </Typography>
          <Link component={RouterLink} to="/admin/inventory" sx={{ color: "common.white" }}>
            Inventory Management
          </Link>
          <Link component={RouterLink} to="/admin/sales" sx={{ color: "common.white" }}>
            Sales Reports
          </Link>
          <Link component={RouterLink} to="/admin/analytics" sx={{ color: "common.white" }}>
            User Analytics
          </Link>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Link component={RouterLink} to="/admin/settings" sx={{ color: "common.white" }}>
            Settings
          </Link>
          <Link component={RouterLink} to="/logout" sx={{ color: "common.white" }}>
            Logout
          </Link>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, padding: 4 }}>
        <Typography
          level="h1"
          fontSize="xl"
          textColor="primary.main"
          align="center"
          sx={{
            fontSize: '3rem', // Bigger and blue title
            color: '#5271ff' // Overrides the theme color with blue
          }}
        >
          OFS Admin Dashboard
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          {/* Info Cards */}
          <Card sx={{ flexGrow: 1, m: 1 }}>
            <CardContent>
              <Typography level="h2" fontSize="md">Orders</Typography>
              <Typography level="h1" fontSize="xl">663</Typography>
            </CardContent>
          </Card>
          <Card sx={{ flexGrow: 1, m: 1 }}>
            <CardContent>
              <Typography level="h2" fontSize="md">Delivered</Typography>
              <Typography level="h1" fontSize="xl">423</Typography>
            </CardContent>
          </Card>
          <Card sx={{ flexGrow: 1, m: 1 }}>
            <CardContent>
              <Typography level="h2" fontSize="md">Pending</Typography>
              <Typography level="h1" fontSize="xl">115</Typography>
            </CardContent>
          </Card>
          <Card sx={{ flexGrow: 1, m: 1 }}>
            <CardContent>
              <Typography level="h2" fontSize="md">Refunded</Typography>
              <Typography level="h1" fontSize="xl">30</Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Charts */}
        <Box sx={{ display: 'flex', mt: 4 }}>
          <Box sx={{ width: '70%', mr: 2 }}>
            <Typography level="h2" fontSize="lg">Sales, Expenses and Profit</Typography>
            <Chart options={salesData.options} series={salesData.series} type="line" height={350} />
          </Box>
          <Box sx={{ width: '30%' }}>
            <Typography level="h2" fontSize="lg">Sales by Category</Typography>
            <Chart options={categoryData.options} series={categoryData.series} type="donut" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
