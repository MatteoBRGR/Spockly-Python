import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/spockly_logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav style={styles.navbar}>
      {/* Logo */}
      <Link to="/" style={styles.logoContainer}>
        <img src={logo} alt="SPOCKLY Logo" style={styles.logo} />
        <span style={styles.brand}>SPOCKLY</span>
      </Link>

      {/* Hamburger Icon for Mobile */}
      {isMobile && (
        <div style={styles.hamburger} onClick={toggleMenu}>
          <div style={styles.bar}></div>
          <div style={styles.bar}></div>
          <div style={styles.bar}></div>
        </div>
      )}

      {/* Navigation Links */}
      {(isMobile && isOpen) || !isMobile ? (
        <div style={{
          ...styles.links,
          flexDirection: isMobile ? "column" : "row",
          width: isMobile ? "100%" : "auto",
          marginTop: isMobile ? "1rem" : 0
        }}>
          <NavLink to="/spockly" onClick={() => setIsOpen(false)} style={getLinkStyle}>Editor</NavLink>
          <NavLink to="/tutorials" onClick={() => setIsOpen(false)} style={getLinkStyle}>Tutorials</NavLink>
        </div>
      ) : null}
    </nav>
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
    flexWrap: "wrap"
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none"
  },
  logo: {
    height: "36px",
    marginRight: "0.5rem"
  },
  brand: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: "white"
  },
  hamburger: {
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    gap: "4px",
    marginLeft: "auto"
  },
  bar: {
    width: "25px",
    height: "3px",
    backgroundColor: "white",
    borderRadius: "2px"
  },
  links: {
    display: "flex",
    gap: "1.5rem"
  }
};

const getLinkStyle = ({ isActive }) => ({
  color: isActive ? "#ffffff" : "#e0f7fa",
  fontWeight: isActive ? "bold" : "normal",
  textDecoration: "none"
});

export default Navbar;