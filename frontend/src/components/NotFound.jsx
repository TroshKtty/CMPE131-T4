import { Box, Sheet, Typography } from "@mui/joy";
import { useLocation } from "react-router-dom";
import { GhostIcon } from "lucide-react";

export default function NotFound() {
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
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        maxWidth={"75%"}
        width={"100%"}
        gap={4}
      >
        <Typography level="h1">0 results for &ldquo;{query}&rdquo;</Typography>
        <GhostIcon style={{ width: "200px", height: "200px" }} />
        <Typography level="body1">
          We&apos;ve searched far and wide, but couldn&apos;t find what you were
          looking for.
        </Typography>
        <Typography level="body1">
          We can help. Check your spelling, refine your search or explore
          popular items below.
        </Typography>
      </Box>
    </Sheet>
  );
}
