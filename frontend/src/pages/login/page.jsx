import "./styles.css";
import {
  Alert,
  Box,
  Button,
  IconButton,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Link,
  Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { EyeOff, Eye, X } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("token") || localStorage.getItem("token"))
      navigate("/");
  }, [navigate]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [msg, setMsg] = useState("");

  const handleLogin = async (ev) => {
    ev.preventDefault();
    axios.defaults.withCredentials = true;

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });

      if (rememberMe) localStorage.setItem("token", response.data.token);
      else sessionStorage.setItem("token", response.data.token);

      console.log("Logged in successfully!");

      const token = response.data.token;
      // console.log("token", token);

      const role = jwtDecode(token).role;
      if (role === "admin") navigate("/admin");
      else if (role === "employee") navigate("/");
      else navigate("/");
    } catch (error) {
      // alert("Invalid username or password. Please try again.");
      console.log("Login failed", error);
      if (error instanceof AxiosError && error?.response?.data?.message) {
        setMsg(error.response.data.message);
      } else {
        setMsg("An error occured while logging in.");
      }
    }
  };

  return (
    <>
      <Box component="nav" className="navbar">
        <Typography className="navbar-title">OFS</Typography>
      </Box>
      <Box className="login-container">
        <Box className="login-box">
          {msg && (
            <Alert
              severity="error"
              variant="soft"
              endDecorator={
                <IconButton onClick={() => setMsg("")}>
                  <X />
                </IconButton>
              }
              sx={{ p: 1 }}
            >
              {msg}
            </Alert>
          )}
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
                <PasswordInput
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
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

function PasswordInput({ value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <FormControl required>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          onClick={togglePasswordVisibility}
          sx={{ marginLeft: "3px" }}
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </IconButton>
      </Box>
    </FormControl>
  );
}
