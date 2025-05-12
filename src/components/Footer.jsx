import React from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.linksContainer}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/spockly" style={styles.link}>SPOCKLY</Link>
        <Link to="/tutorials" style={styles.link}>Tutorials</Link>
        <Link to="/impressum" style={styles.link}>Legal Notice</Link>
        <a href="https://github.com/ifgi/spockly-demo/" target="_blank" rel="noreferrer" style={styles.iconLink}>
          <FaGithub size={20} />
        </a>
        <a href="https://www.uni-muenster.de/Geoinformatics/" target="_blank" rel="noreferrer" style={styles.link}>
          ifgi Website
        </a>
      </div>

      <div style={styles.bottomNote}>
        © 2025 SPOCKLY — ifgi
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "var(--color-secondary)",
    color: "white",
    padding: "2rem",
    fontSize: "0.9rem",
    textAlign: "center",
    marginTop: "4rem"
  },
  linksContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "2rem",
    marginBottom: "1.5rem"
  },
  link: {
    color: "var(--color-bg-light)",
    textDecoration: "none",
    fontWeight: 500
  },
  iconLink: {
    color: "var(--color-bg-light)",
    textDecoration: "none",
    display: "flex",
    alignItems: "center"
  },
  bottomNote: {
    marginTop: "1rem",
    fontStyle: "italic",
    color: "var(--color-bg-light)"
  }
};

export default Footer;
