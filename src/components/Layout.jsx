import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div style={styles.wrapper}>
      <Navbar />
      <main style={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  main: {
    flex: 1,
    paddingBottom: "2rem"
  }
};

export default Layout;
