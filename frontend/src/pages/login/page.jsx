import "./styles.css";
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
import axios from "axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (ev) => {
    ev.preventDefault();
    axios.defaults.withCredentials = true;

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });
      alert("Logged in successfully!");
      console.log(response);
    } catch (error) {
      alert("Invalid email or password. Please try again.");
      console.error("Login failed", error);
    }
  };

  return (
    <>
      <Box component="nav" className="navbar">
        <Typography className="navbar-title">OFS</Typography>
      </Box>
      <Box className="login-container">
        <Box className="login-box">
          <Typography className="login-title">Log In</Typography>
          <form onSubmit={handleLogin}>
            <Box className="login-form">
              <FormControl required>
                <FormLabel className="form-label">Username</FormLabel>
                <Input
                  onChange={(ev) => setUsername(ev.target.value)}
                  type="text"
                  required
                />
              </FormControl>
              <FormControl required>
                <FormLabel className="form-label">Password</FormLabel>
                <Input
                  onChange={(ev) => setPassword(ev.target.value)}
                  type="password"
                  required
                />
              </FormControl>
              <FormControl>
                <Box className="remember-forgot">
                  <Box className="remember-me">
                    <Checkbox
                      onChange={(ev) => setRememberMe(ev.target.checked)}
                    />
                    <FormLabel className="form-label">Remember me</FormLabel>
                  </Box>
                  <Link className="forgot-password">Forgot password</Link>
                </Box>
              </FormControl>
              <Button type="submit" fullWidth className="submit-button">
                Log In
              </Button>
            </Box>
          </form>
          <Divider className="divider">or</Divider>
          <Box className="create-account">
            <Typography className="no-account-text">
              Don&apos;t have an account?
            </Typography>
            <Button
              variant="soft"
              fullWidth
              onClick={() => navigate("/registration")}
              className="create-account-button"
            >
              Create Account
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
