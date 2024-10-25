import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Typography,
  } from "@mui/joy";
  import { useState } from "react";

  export default function RegistrationPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    // const [otp, setOtp] = useState("");
  
    const handleRegistration = (ev) => {
      ev.preventDefault();
      console.log("form submitted with", {
        email,
        password,
        phone
      });
    };
  
    return (
      <>
        <Box
          component="nav"
          sx={{
            p: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
            position: "fixed",
            top: 0,
            width: "100%",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            bgcolor: "background.surface",
          }}
        >
          <Typography level="h1" fontWeight="bold">
            OFS
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box width="50%">
            <Typography level="h2" marginBottom={2}>
              Register
            </Typography>
            <Box>
              <form onSubmit={handleRegistration}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
                >
                  <FormControl required>
                    <FormLabel>Email</FormLabel>
                    <Input
                      onChange={(ev) => setEmail(ev.target.value)}
                      type="email"
                      required
                    />
                  </FormControl>
                  <FormControl required>
                    <FormLabel>Password</FormLabel>
                    <Input
                      onChange={(ev) => setPassword(ev.target.value)}
                      type="password"
                      required
                    />
                  </FormControl>
                  <FormControl required>
                    <FormLabel>Phone</FormLabel>
                    <Input
                      onChange={(ev) => setPhone(ev.target.value)}
                      type="text"
                      required
                    />
                  </FormControl>
                  <Button type="submit" fullWidth>
                    Register
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </>
    );
  }
  
