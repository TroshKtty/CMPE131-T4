import { Box, Typography, Button } from "@mui/joy";
import { useNavigate } from "react-router-dom";

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <Typography level="h1" fontSize="xl" color="error">
        Unauthorized Access
      </Typography>
      <Typography level="body1" sx={{ marginY: 2 }}>
        You do not have permission to view this page.
      </Typography>
      <Button
        variant="solid"
        color="primary"
        onClick={() => navigate("/")}
      >
        Go to Home
      </Button>
    </Box>
  );
}
