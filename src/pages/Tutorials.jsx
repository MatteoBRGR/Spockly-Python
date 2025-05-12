import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const tutorialRoutes = [
  { path: "introduction", label: "Introduction" },
  { path: "why", label: "Why use SPOCKLY?" },
  { path: "who", label: "Who is it for?" },
  { path: "how", label: "How to use SPOCKLY?"},
  { path: "example", label: "Example Use Case" },
];

const Tutorials = () => {
  const location = useLocation();

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Tutorials</h2>
        <nav style={styles.navList}>
          {tutorialRoutes.map((section) => {
            const isActive = location.pathname === `/tutorials/${section.path}` ||
              (section.path === "introduction" && location.pathname === "/tutorials");
            return (
              <NavLink
                key={section.path}
                to={`/tutorials/${section.path}`}
                style={{
                  ...styles.navItem,
                  fontWeight: isActive ? "bold" : "normal",
                  color: isActive ? "var(--color-primary)" : "var(--color-text-dark)"
                }}
              >
                {section.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Content */}
      <main style={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem",
    fontFamily: "system-ui, sans-serif"
  },
  sidebar: {
    width: "220px",
    marginRight: "2rem"
  },
  sidebarTitle: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
    color: "var(--color-primary)"
  },
  navList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem"
  },
  navItem: {
    textDecoration: "none",
    fontSize: "1rem"
  },
  content: {
    flex: 1
  }
};

export default Tutorials;