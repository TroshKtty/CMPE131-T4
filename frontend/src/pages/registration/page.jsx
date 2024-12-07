import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Typography,
  Radio,
  RadioGroup,
} from "@mui/joy";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const validatePhoneNumber = (phone) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
};

export default function RegistrationPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("token") || localStorage.getItem("token"))
      navigate("/");
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phone_no, setphone_no] = useState("");
  const [role, setRole] = useState("Customer");

  // messages
  const [message, setMessage] = useState("");
  const [username_message, setUsernameMessage] = useState("");
  const [phone_message, setPhoneMessage] = useState("");

  const handleRegistration = async (ev) => {
    ev.preventDefault();

    if (!validatePhoneNumber(phone_no)) {
      setPhoneMessage("Please enter a valid 10-digit phone number");
      return;
    } else {
      setPhoneMessage("");
    }

    try {
      const response = await axios.post("http://localhost:3000/auth/register", {
        name,
        email,
        username,
        password,
        phone_no,
        role,
      });

      // Clear fields after successful registration
      setName("");
      setEmail("");
      setUserName("");
      setPassword("");
      setphone_no("");
      setRole("Customer");
      setPhoneMessage("");
      setMessage(response.data.message + " Redirecting to Login Page...");

      setTimeout(() => {
        navigate("/login");
      }, 4000);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 409) {
          setUserName("");
        }
        setUsernameMessage(err.response.data.message);
      } else {
        setMessage("Something went wrong ...");
      }
    }
  };

  return (
    <>
      <Box
        component="nav"
        sx={{
          p: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
          position: "relative",
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
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box width="50%" sx={{ zIndex: 2 }}>
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
                    value={email}
                  />
                </FormControl>
                <FormControl required>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    onChange={(ev) => setName(ev.target.value)}
                    type="text"
                    required
                    value={name}
                  />
                </FormControl>
                <FormControl required>
                  <FormLabel>Username</FormLabel>
                  <Input
                    onChange={(ev) => {
                      setUserName(ev.target.value);
                      setUsernameMessage("");
                    }}
                    type="text"
                    required
                    value={username}
                  />
                  {username_message && (
                    <Typography
                      padding="px"
                      color="danger"
                      mt={2}
                      fontSize={15}
                    >
                      {username_message}
                    </Typography>
                  )}
                </FormControl>
                <FormControl required>
                  <FormLabel>Password</FormLabel>
                  <Input
                    onChange={(ev) => setPassword(ev.target.value)}
                    type="password"
                    required
                    value={password}
                  />
                </FormControl>
                <FormControl required>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    onChange={(ev) => setphone_no(ev.target.value)}
                    type="tel"
                    required
                    value={phone_no}
                  />
                  {phone_message && (
                    <Typography
                      padding="px"
                      color="danger"
                      mt={2}
                      fontSize={15}
                    >
                      {phone_message}
                    </Typography>
                  )}
                </FormControl>
                <FormControl required>
                  Role:
                  <RadioGroup
                    orientation="horizontal"
                    aria-labelledby="segmented-controls-example"
                    name="role"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                    sx={{
                      minHeight: 48,
                      width: 310,
                      padding: "4px",
                      borderRadius: "12px",
                      bgcolor: "neutral.softBg",
                      "--RadioGroup-gap": "4px",
                      "--Radio-actionRadius": "8px",
                    }}
                  >
                    {["Customer", "Employee", "Admin"].map((item) => (
                      <Radio
                        key={item}
                        color="primary"
                        value={item}
                        disableIcon
                        label={item}
                        variant="plain"
                        sx={{ px: 2, alignItems: "center" }}
                        slotProps={{
                          action: ({ checked }) => ({
                            sx: {
                              ...(checked && {
                                bgcolor: "background.surface",
                                boxShadow: "sm",
                                "&:hover": {
                                  bgcolor: "background.surface",
                                },
                              }),
                            },
                          }),
                        }}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
                <Button type="submit" fullWidth>
                  Register
                </Button>
              </Box>
            </form>
            {message && (
              <Typography color="primary" mt={2} fontSize={20}>
                {message}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
