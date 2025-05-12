import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({isDarkMode, toggleTheme}) => {
  return (
    <div>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
