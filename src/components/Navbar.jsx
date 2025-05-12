import React, { useState, useEffect } from "react";
import SpocklyLogo from "../assets/spockly_logo.png";
import { AppBar, Box, Fab, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Brightness3, LightMode } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
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
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
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
        </Link>
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
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "var(--color-secondary)",
    borderBottom: "1px solid #e0e0e0",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    flexWrap: "wrap",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  logo: {
    height: "36px",
    marginRight: "0.5rem",
  },
  brand: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: "white",
  },
  hamburger: {
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    gap: "4px",
    marginLeft: "auto",
  },
  bar: {
    width: "25px",
    height: "3px",
    backgroundColor: "white",
    borderRadius: "2px",
  },
  links: {
    display: "flex",
    gap: "1.5rem",
  },
};

const getLinkStyle = ({ isActive }) => ({
  color: isActive ? "#ffffff" : "#e0f7fa",
  fontWeight: isActive ? "bold" : "normal",
  textDecoration: "none",
});

export default Navbar;

{
  /*

        <Link to="/" style={styles.logoContainer}>
        <img src={logo} alt="SPOCKLY Logo" style={styles.logo} />
        <span style={styles.brand}>SPOCKLY</span>
      </Link>
      {isMobile && (
        <div style={styles.hamburger} onClick={toggleMenu}>
          <div style={styles.bar}></div>
          <div style={styles.bar}></div>
          <div style={styles.bar}></div>
        </div>
      )}
      {(isMobile && isOpen) || !isMobile ? (
        <div style={{
          ...styles.links,
          flexDirection: isMobile ? "column" : "row",
          width: isMobile ? "100%" : "auto",
          marginTop: isMobile ? "1rem" : 0
        }}>
          <NavLink to="/spockly" onClick={() => setIsOpen(false)} style={getLinkStyle}>SPOCKLY</NavLink>
          <NavLink to="/tutorials" onClick={() => setIsOpen(false)} style={getLinkStyle}>Tutorials</NavLink>
        </div>
      ) : null}
    </nav>
  */
}
