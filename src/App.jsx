import { ThemeProvider } from "@emotion/react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Fab,
  Grid,
  Card,
} from "@mui/material";
import React, { useState } from "react";
import SpocklyLogo from "./assets/spockly_logo.png";
import BlocklyComponent from "./components/BlocklyComponent";
import CodeDisplay from "./components/CodeDisplay";
import WebRRunner from "./components/WebRRunner";
import { darkTheme, lightTheme } from "./theme";
import { Brightness3, Home, LightMode } from "@mui/icons-material";

function App() {
  const [code, setCode] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => setIsDarkMode((prev) => !prev);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: "100vh", width: "100vw", margin: 0, padding: 0 }}>
        {/* Appbar */}
        <AppBar
          position="static"
          sx={{
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          }}
        >
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <Box display="flex" alignItems="center">
              <img
                src={SpocklyLogo}
                alt="Spockly Logo"
                style={{ height: "40px", width: "40px", marginRight: 10 }}
              />
              <Typography variant="h4" style={{ fontWeight: "bold" }}>
                SPOCKLY
              </Typography>
            </Box>
            <Fab
              variant="extended"
              sx={{
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                },
              }}
              onClick={toggleTheme}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="120px"
              >
                {isDarkMode ? <LightMode /> : <Brightness3 />}
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </Box>
            </Fab>
          </Toolbar>
        </AppBar>
        <Grid container sx={{ height: "100vh" }}>
          <Grid item size={6}>
            <BlocklyComponent setCode={setCode} isDarkMode={isDarkMode} />
          </Grid>
          <Grid item size={6}>
            <Box
              sx={{
                backgroundColor: "#e0e0e0",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4">Right Side</Typography>
            </Box>
          </Grid>
        </Grid>

        <div style={{ display: "flex", height: "90vh" }}>
          {/* Blockly Editor */}
          <div style={{ flex: 1 }}></div>

          {/* Code Output */}
          <div
            style={{
              flex: 1,
              padding: "1rem",
              overflow: "auto",
              background: "prima",
            }}
          >
            <h2>Generated Python Code</h2>
            <CodeDisplay code={code} />
            <WebRRunner code={code} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
