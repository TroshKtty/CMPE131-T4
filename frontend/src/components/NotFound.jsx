import { Box, Sheet, Typography } from "@mui/joy";
import { useLocation } from "react-router-dom";

export default function ItemNotFound() {
  const location = useLocation();
  // /product/asdasdsa -> substring(9) -> asdasdsa
  const query = location.pathname.substring(9);

  return (
    <Sheet
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: 3,
        backgroundColor: "background.body",
      }}
    >
      <Box
        sx={{
          maxWidth: "600px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography level="h1" sx={{ mb: 2 }}>
          0 results for &ldquo;{query}&rdquo;
        </Typography>
        <Typography level="body1" sx={{ mb: 2 }}>
          We&apos;ve searched far and wide, but couldn&apos;t find what you
          were looking for.
        </Typography>
        <Typography level="body1">
          We can help. Check your spelling, refine your search or explore
          popular items below.
        </Typography>
      </Box>
    </Sheet>
  );
}
