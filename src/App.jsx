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
import {
  GlobalStyles,
  ThemeProvider,
  AppBar,
  Card,
  Toolbar,
  Box,
  Typography,
  Fab,
  Grid,
} from "@mui/material";
import SpocklyLogo from "./assets/spockly_logo.png";
import { darkTheme, lightTheme } from "./appTheme";
import { Brightness3, LightMode } from "@mui/icons-material";
import WebRRunner from "./components/WebRRunner";

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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => setIsDarkMode((prev) => !prev);
  const theme = isDarkMode ? darkTheme : lightTheme;
  
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            }
          >
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
    </ThemeProvider>
  );
}

export default App;
