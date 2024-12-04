import "@/pages/accinfo/styles.css";
import React from "react";
import { Box, Typography, Link, Card, CardContent, Divider, Button, Input, Stack} from "@mui/joy";
import "react-multi-carousel/lib/styles.css";
import { Link as RouterLink } from "react-router-dom";

export default function PaymentInfoPage() {
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
          <Link component={RouterLink} to="/accinfo/payment" sx={{ color: "#5271ff", fontSize: "1.3rem" }}>
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
          Payment Methods
        </Typography>

        <Divider></Divider>


        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Card sx={{ flexGrow: 1  }}>
            <CardContent>
              <Typography fontSize="1.3rem" fontWeight="bold">Card Ending in 1234</Typography>
              <Typography fontSize="1.25rem" fontWeight="body-sm">Card Number</Typography>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    JSON.stringify(formJson)
                    alert("Card Info Updated")
                  }}
                >
                  <Stack spacing={1}>
                  <Input placeholder="1234 5678 9098 7654" variant="soft" size="md" required />
                    <Button type="submit">Submit</Button>
                  </Stack>
                </form>

              <Typography fontSize="1.25rem" fontWeight="body-sm">Expiration</Typography>
              <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    JSON.stringify(formJson)
                    alert("Card Info Updated")
                  }}
                >
                  <Stack spacing={1}>
                    <Input placeholder="DD/YY" variant="soft" size="md" required />
                    <Button type="submit">Submit</Button>
                  </Stack>
                </form>

              <Typography fontSize="1.25rem" fontWeight="body-sm">CVC</Typography>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    JSON.stringify(formJson)
                    alert("Card Info Updated")
                  }}
                >
                  <Stack spacing={1}>
                    <Input placeholder="123" required />
                    <Button type="submit">Submit</Button>
                  </Stack>
                </form>
            </CardContent>
        </Card>
          </Box>
      </Box>
    </Box>


  );
}
