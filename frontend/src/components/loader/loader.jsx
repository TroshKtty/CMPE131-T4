import { CircularProgress, Sheet } from "@mui/joy";

export default function Loader() {
  return (
    <Sheet
      sx={{
        bgcolor: "background.body",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        margin: 4,
        gap: 4,
      }}
    >
      <CircularProgress />
      <p>Loading...</p>
    </Sheet>
  );
}
