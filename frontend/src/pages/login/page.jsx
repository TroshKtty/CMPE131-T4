import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Link,
  Typography,
} from "@mui/joy";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
//import jwt_decode from 'jwt-decode';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  // const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (ev) => {
    ev.preventDefault();
    
    try {
      // Send login request
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });

      const token = response.data.token;

      // Store token in localStorage
      if(rememberMe)
        localStorage.setItem("token", token);
      else
        sessionStorage.setItem("token", token);
      console.log("Success");

      // Call redirect function to navigate based on role
      //redirect(token);
    } catch (error) {
      alert("Invalid email or password. Please try again.");
      console.error("Login failed", error);
    }
  };

  /*const redirect = (token) => {
    // Decode token to get user role
    const decoded = jwt_decode(token);
    const userRole = decoded.role;

    // Redirect based on user role
    if (userRole === "admin") {
      navigate("/admin");
    } else if (userRole === "employee") {
      navigate("/");
    } else {
      navigate("/");
    }
  };*/

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
            Log In
          </Typography>
          <Box>
            <form onSubmit={handleLogin}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
              >
                <FormControl required>
                  <FormLabel>Username</FormLabel>
                  <Input
                    onChange={(ev) => setUsername(ev.target.value)}
                    type="text"
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
                <FormControl>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        gap: 1,
                      }}
                    >
                      <Checkbox
                        onChange={(ev) => setRememberMe(ev.target.checked)}
                      />
                      <FormLabel>Remember me</FormLabel>
                    </Box>
                    <Box>
                      <Link level="title-xs" textAlign="right">
                        Forgot password
                      </Link>
                    </Box>
                  </Box>
                </FormControl>
                <Button type="submit" fullWidth>
                  Log In
                </Button>
              </Box>
            </form>
          </Box>
          <Box mt={1.5}>
            <Divider sx={{ marginTop: "4px" }}>or</Divider>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginTop: "8px",
              }}
            >
              <Typography level="title-lg">
                Don&apos;t have an account?
              </Typography>
              <Button
                variant="soft"
                fullWidth
                onClick={() => navigate("/registration")}
              >
                Create Account
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
