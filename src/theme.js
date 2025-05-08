// src/theme.js
import { indigo, lightBlue, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: lightBlue[500],
      contrastText: "#fff",
    },
    background: {
      default: "#f5f5f5",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#15134C",
      contrastText: "#fff",
    },
    background: {
      default: "#202A7C",
    },
  },
});
