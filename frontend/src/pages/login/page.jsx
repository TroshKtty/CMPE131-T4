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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  // const [otp, setOtp] = useState("");

  const handleLogin = (ev) => {
    ev.preventDefault();

    console.log("form submitted with", {
      email,
      password,
      rememberMe /* otp */,
    });
  };

  /*
  <div class="flex flex-row min-h-screen justify-center items-center">
  I am centered
</div>
*/

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "50%" }}>
        <Box>
          <form onSubmit={handleLogin}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  onChange={(ev) => setEmail(ev.target.value)}
                  type="email"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  onChange={(ev) => setPassword(ev.target.value)}
                  type="password"
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
              <Button type="submit" sx={{ width: "100%", display: "block" }}>
                Log In
              </Button>
            </Box>
          </form>
        </Box>
        <Box mt={1.5}>
          <Divider sx={{ marginTop: "4px" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginTop: "16px",
            }}
          >
            <Typography level="title-lg">
              Don&apos;t have an account?
            </Typography>
            <Button
              variant="soft"
              sx={{ display: "block", width: "100%" }}
              onClick={() => alert("hello world")}
            >
              Create Account
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
