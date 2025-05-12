import React, { useState, useEffect } from "react";
import SpocklyLogo from "../assets/spockly_logo.png";
import {
  AppBar,
  Box,
  Fab,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Brightness3, LightMode } from "@mui/icons-material";
import { Link, NavLink } from "react-router-dom";

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
        <Grid
          container
          sx={{
            flexGrow: 1,
          }}
        >
          <Grid size={8}>
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
          </Grid>
          <Grid size={4}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <NavLink
                to="/spockly"
                onClick={() => setIsOpen(false)}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Box
                  sx={{
                    color: "inherit",
                    "&:hover": {
                      color: theme.palette.secondary.main,
                    },
                  }}
                >
                  <Typography fontWeight="bold">SPOCKLY</Typography>
                </Box>
              </NavLink>
              <NavLink
                to="/tutorials"
                onClick={() => setIsOpen(false)}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Box
                  sx={{
                    color: "inherit",
                    "&:hover": {
                      color: theme.palette.secondary.main,
                    },
                  }}
                >
                  <Typography fontWeight="bold">Tutorials</Typography>
                </Box>
              </NavLink>
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
            </Stack>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
