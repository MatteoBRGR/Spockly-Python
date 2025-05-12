import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGlobe, FaCodeBranch, FaCube, FaRocket, FaBookOpen, FaCompass } from "react-icons/fa";
import logo from "../assets/spockly_logo.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: "spring", stiffness: 60, damping: 15 }
  }
};

const Home = () => (
  <div style={{ fontFamily: "system-ui, sans-serif", color: "var(--color-text-dark)" }}>

    {/* Hero Section */}
    <section style={{
      backgroundColor: "var(--color-bg-light)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    }}>
      <motion.img
        src={logo}
        alt="SPOCKLY Logo"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ width: "min(80vw, 380px)", marginBottom: "1.8rem" }}
      />

      <motion.h1
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={{ fontSize: "2.8rem", color: "var(--color-primary)", margin: 0 }}
      >
        SPOCKLY
      </motion.h1>

      <motion.p
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ delay: 0.6, duration: 0.6 }}
        style={{ fontSize: "1.2rem", maxWidth: "700px", marginTop: "1.5rem", lineHeight: "1.6" }}
      >
        <strong>Spatial Blockly</strong> — A visual programming tool for <strong>spatial data science</strong>.
      </motion.p>
    </section>

    {/* What is SPOCKLY Section */}
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
      transition={{ duration: 0.7 }}
      style={{ backgroundColor: "white", padding: "2rem 2rem", textAlign: "center" }}
    >
      <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>What is SPOCKLY?</h2>
      <p style={{ maxWidth: "800px", margin: "0 auto", fontSize: "1.1rem", lineHeight: "1.8" }}>
        Learn data science visually – no syntax, just blocks.<br />
        Use SPOCKLY to organize, filter, map and analyze real-world geospatial datasets.<br/>
        Perfect for students, schools and educators.
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "2rem", flexWrap: "wrap" }}>
        <motion.div whileHover={{ scale: 1.1 }} style={iconBox}><FaGlobe size={32} /> <span>Spatial Data</span></motion.div>
        <motion.div whileHover={{ scale: 1.1 }} style={iconBox}><FaCube size={32} /> <span>Blockly Interface</span></motion.div>
        <motion.div whileHover={{ scale: 1.1 }} style={iconBox}><FaCodeBranch size={32} /> <span>Using R</span></motion.div>
      </div>
    </motion.section>

    {/* Call to Action */}
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      transition={{ delay: 0.1 }}
      style={{ backgroundColor: "var(--color-accent)", padding: "4rem 2rem", textAlign: "center", color: "white" }}
    >
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <FaCompass size={40} style={{ marginBottom: "1rem" }} />
        <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Start exploring</h2>
      </motion.div>

      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
        <Link to="/SPOCKLY">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={buttonPrimary}>
            <FaRocket style={{ marginRight: "0.5rem" }} /> Start SPOCKLY Editor
          </motion.button>
        </Link>
        <Link to="/tutorials">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={buttonOutline}>
            <FaBookOpen style={{ marginRight: "0.5rem" }} /> View Tutorials
          </motion.button>
        </Link>
      </div>
    </motion.section>
  </div>
);

// Button Styles
const buttonPrimary = {
  padding: "0.75rem 1.5rem",
  fontSize: "1rem",
  fontWeight: "600",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "var(--color-primary)",
  color: "white",
  cursor: "pointer",
  display: "flex",
  alignItems: "center"
};

const buttonOutline = {
  ...buttonPrimary,
  backgroundColor: "white",
  border: "2px solid var(--color-primary)",
  color: "var(--color-primary)"
};

const iconBox = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  fontSize: "1rem",
  color: "var(--color-text-dark)",
  transition: "transform 0.2s ease"
};

export default Home;
