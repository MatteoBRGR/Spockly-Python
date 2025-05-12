import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BlocklyComponent from "./components/BlocklyComponent";
import CodeDisplay from "./components/CodeDisplay";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Tutorials from "./pages/Tutorials";
import TutorialIntroduction from "./pages/tutorials/TutorialIntroduction";
import TutorialWhy from "./pages/tutorials/TutorialWhy";
import TutorialWho from "./pages/tutorials/TutorialWho";
import TutorialHow from "./pages/tutorials/TutorialHow";
import TutorialExample from "./pages/tutorials/TutorialExample";
import Impressum from "./pages/Impressum";
import { GlobalStyles, ThemeProvider } from "@mui/material";
import {
  AppBar,
  Card,
  Toolbar,
  Box,
  Typography,
  Fab,
  Grid,
} from "@mui/material";
import { useState } from "react";
import SpocklyLogo from "./assets/spockly_logo.png";
import BlocklyComponent from "./components/BlocklyComponent";
import CodeDisplay from "./components/CodeDisplay";

function SPOCKLY() {
  const [code, setCode] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => setIsDarkMode((prev) => !prev);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          html: { height: "100%" },
          body: {
            margin: 0,
            padding: 0,
            height: "100%",
            backgroundColor: theme.palette.background.default,
          },
          "#root": {
            height: "100%",
          },
          h1: { textTransform: "none" },
          h2: { textTransform: "none" },
          h3: { textTransform: "none" },
          h4: { textTransform: "none" },
          h5: { textTransform: "none" },
          h6: { textTransform: "none" },
          p: { textTransform: "none" },
          ".blocklyTrash": {
            opacity: "1 !important",
          },
          image: {
            opacity: "1 !important",
          },
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <AppBar
          position="static"
          sx={{
            boxShadow: "none",
            height: "60px",
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          }}
        >
          <Toolbar
            sx={{
              minHeight: "50px",
              height: "50px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 2,
            }}
          >
            <Box display="flex" alignItems="center">
              <img
                src={SpocklyLogo}
                alt="Spockly Logo"
                style={{ height: "40px", width: "40px", marginRight: 10 }}
              />
              <Typography variant="h6" fontWeight="bold">
                SPOCKLY
              </Typography>
            </Box>
            <Fab
              variant="extended"
              size="small"
              sx={{
                width: "90px",
                bgcolor: theme.palette.primary.contrastText,
                color: theme.palette.primary.main,
                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                  color: theme.palette.primary.contrastText,
                },
                boxShadow: "none",
              }}
              onClick={toggleTheme}
            >
              <Box display="flex" alignItems="center" gap={0.5}>
                {isDarkMode ? (
                  <LightMode fontSize="small" />
                ) : (
                  <Brightness3 fontSize="small" />
                )}
                {isDarkMode ? "Light" : "Dark"}
              </Box>
            </Fab>
          </Toolbar>
        </AppBar>

        <Grid
          container
          sx={{
            flexGrow: 1,
            height: "100vh",
          }}
        >
          <Grid size={6} sx={{ height: "100%" }}>
            <Card
              sx={{
                m: 2,
                p: 2,
                borderRadius: "16px",
                backgroundColor: theme.palette.primary.main,
                height: "85%",
                boxShadow: 3,
              }}
            >
              <BlocklyComponent setCode={setCode} isDarkMode={isDarkMode} />
            </Card>
          </Grid>

          <Grid
            size={6}
            sx={{
              height: "100%",
              overflowY: "auto",
            }}
          >
            <Card
              sx={{
                m: 2,
                p: 2,
                borderRadius: "16px",
                backgroundColor: theme.palette.primary.main,
                height: "85%",
                boxShadow: 3,
                position: "relative",
              }}
            >
              <Box sx={{ height: "50%", p: 2 }}>
                <CodeDisplay code={code} isDarkMode={isDarkMode} />
              </Box>
              <Box sx={{ height: "50%", p: 2 }}>
                <WebRRunner code={code} isDarkMode={isDarkMode} />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="spockly" element={<SPOCKLY />} />
          <Route path="/tutorials/*" element={<Tutorials />}>
            <Route index element={<TutorialIntroduction />} />
            <Route path="introduction" element={<TutorialIntroduction />} />
            <Route path="why" element={<TutorialWhy />} />
            <Route path="who" element={<TutorialWho />} />
            <Route path="how" element={<TutorialHow />} />
            <Route path="example" element={<TutorialExample />} />
          </Route>
          <Route path="impressum" element={<Impressum />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
