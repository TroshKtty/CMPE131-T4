import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/joy";
import Chart from "react-apexcharts";
import AdminSidebar from "@/components/admin_navbar/admin_navbar"; // Ensure this path is correct

export default function AdminDashboardPage() {
  const salesData = {
    series: [
      {
        name: "Sales",
        data: [4500, 6500, 8000, 7200],
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 350,
      },
      stroke: {
        width: 7,
        curve: "smooth",
      },
      xaxis: {
        categories: ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"],
      },
      markers: {
        size: 5,
      },
      colors: ["#20E647"],
    },
  };

  const categoryData = {
    series: [38.8, 22.9, 23, 15.3],
    options: {
      labels: ["Fruits and Vegetables", "Snacks", "Meat and Seafood", "Others"],
      colors: ["#FF4560", "#00E396", "#008FFB", "#775DD0"],
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
            },
          },
        },
      },
    },
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f4f5f7" }}>
      <AdminSidebar /> {/* This is where the sidebar is used */}
      <Box sx={{ flexGrow: 1, padding: 4 }}>
        <Typography fontSize="2.5rem" fontWeight="bold" align="center" sx={{ color: "#0c6cba" }}>
          OFS Admin Dashboard
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Card sx={{ flexGrow: 1, m: 1 }}>
            <CardContent>
              <Typography fontSize="1.25rem" fontWeight="medium">Orders</Typography>
              <Typography fontSize="2rem" fontWeight="bold">663</Typography>
            </CardContent>
          </Card>
          <Card sx={{ flexGrow: 1, m: 1 }}>
            <CardContent>
              <Typography fontSize="1.25rem" fontWeight="medium">Delivered</Typography>
              <Typography fontSize="2rem" fontWeight="bold">423</Typography>
            </CardContent>
          </Card>
          <Card sx={{ flexGrow: 1, m: 1 }}>
            <CardContent>
              <Typography fontSize="1.25rem" fontWeight="medium">Pending</Typography>
              <Typography fontSize="2rem" fontWeight="bold">115</Typography>
            </CardContent>
          </Card>
          <Card sx={{ flexGrow: 1, m: 1 }}>
            <CardContent>
              <Typography fontSize="1.25rem" fontWeight="medium">Refunded</Typography>
              <Typography fontSize="2rem" fontWeight="bold">30</Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ display: "flex", mt: 4 }}>
          <Box sx={{ width: "70%", mr: 2 }}>
            <Typography fontSize="1.5rem" fontWeight="medium">Sales, Expenses, and Profit</Typography>
            <Chart options={salesData.options} series={salesData.series} type="line" height={350} />
          </Box>
          <Box sx={{ width: "30%" }}>
            <Typography fontSize="1.5rem" fontWeight="medium">Sales by Category</Typography>
            <Chart options={categoryData.options} series={categoryData.series} type="donut" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
