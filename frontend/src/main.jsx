import "@fontsource/inter";
import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import theme from "./theme.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <App />
      </div>
    </CssVarsProvider>
  </StrictMode>
);
