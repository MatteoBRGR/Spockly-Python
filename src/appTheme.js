// src/theme.js
import { blue, lightBlue } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: lightBlue[700],
      contrastText: "#fff",
    },
    background: {
      default: "#f5f5f5",
      paper:"#EEEAEA",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#15134C",
      contrastText: "#fff",
      dark: "#15134C",
    },
    background: {
      default: "#202A7C",
      paper:"#EEEAEA",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});
