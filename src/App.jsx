import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { darkTheme, lightTheme } from "./appTheme";
import SPOCKLY from "./components/Spockly";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => setIsDarkMode((prev) => !prev);
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    document.getElementById('toast').style.animation = 'slideIn 5s ease-in-out';
    document.getElementById('toast').style.display = 'block';
  }, []);

  return (
    <ThemeProvider theme={ theme }>
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
      <div>
      <div id="toast"
        style={{
          position: "absolute",
          fontSize: "20px",
          color: "orange",
          zIndex: 1051,
          float: "right",
          overflow: "hidden",
          right: "10px",
          top: "70px",
          backgroundColor: "#FEFEFE",
          boxShadow: "-1px 1px 10px #9f9f9f",
          padding: "0 10px 0 10px",
          borderRadius: "3px",
          margin: "10px",
          display: "none"
        }}
      >
        <p>Loading libraries...</p>
      </div>
    </div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout isDarkMode={ isDarkMode } toggleTheme={ toggleTheme } />
            }
          >
            <Route index element={ <Home isDarkMode={ isDarkMode } /> } />
            <Route
              path="spockly"
              element={ <SPOCKLY isDarkMode={ isDarkMode } /> }
            />
            <Route path="/tutorials/*" element={ <Tutorials /> }>
              <Route index element={ <TutorialIntroduction /> } />
              <Route path="introduction" element={ <TutorialIntroduction /> } />
              <Route path="why" element={ <TutorialWhy /> } />
              <Route path="who" element={ <TutorialWho /> } />
              <Route path="how" element={ <TutorialHow /> } />
              <Route path="example" element={ <TutorialExample /> } />
            </Route>
            <Route path="impressum" element={ <Impressum /> } />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
