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
import { useState } from "react";
import axios from 'axios';

export default function RegistrationPage() {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Customer");
  const [message, setMessage] = useState("");
  // const [otp, setOtp] = useState("");

  const handleRegistration = async(ev) => {
    ev.preventDefault();
    try{
      const response = await axios.post('http://localhost:3000/auth/register', {email, username, password, phone, role});
      setMessage(response.data.message);
      setEmail('');
      setUserName('');
      setPassword('');
      setPhone('');
      setRole('Customer');
    }
    catch(err){
      if(err.response){
        if(err.response.status === 409)
            setUserName('');
        setMessage(err.response.data.message);
      }
      else
        setMessage('Something went wrong bruv');
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
                    value = {email}
                  />
                </FormControl>
                <FormControl required>
                  <FormLabel>Username</FormLabel>
                  <Input
                    onChange={(ev) => setUserName(ev.target.value)}
                    type="text"
                    required
                    value = {username}
                  />
                </FormControl>
                <FormControl required>
                  <FormLabel>Password</FormLabel>
                  <Input
                    onChange={(ev) => setPassword(ev.target.value)}
                    type="password"
                    required
                    value = {password}
                  />
                </FormControl>
                <FormControl required>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    onChange={(ev) => setPhone(ev.target.value)}
                    type="text"
                    required
                    value = {phone}
                  />
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
                    padding: '4px',
                    borderRadius: '12px',
                    bgcolor: 'neutral.softBg',
                    '--RadioGroup-gap': '4px',
                    '--Radio-actionRadius': '8px',
                  }}
                >
                  {['Customer', 'Employee', 'Admin'].map((item) => (
                <Radio
                      key={item}
                      color="primary"
                      value={item}
                      disableIcon
                      label={item}
                      variant="plain"
                      sx={{ px: 2, alignItems: 'center' }}
                      slotProps={{
                        action: ({ checked }) => ({
                          sx: {
                            ...(checked && {
                              bgcolor: 'background.surface',
                              boxShadow: 'sm',
                              '&:hover': {
                                bgcolor: 'background.surface',
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
            {message && <Typography color="primary" mt={2} fontSize={20}>{message}</Typography>}
          </Box>
        </Box>
      </Box>
    </>
  );
}
