import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BlocklyComponent from "./components/BlocklyComponent";
import CodeDisplay from "./components/CodeDisplay";
import Home from "./pages/Home";
import Tutorials from "./pages/Tutorials";


function SPOCKLY() {
  const [code, setCode] = useState("");

  return (
    <div style={{ height: "100vh", width: "100vw", margin: 0, padding: 0 }}>
      <h1 style={{ textAlign: "center", margin: "0.5rem 0" }}>
        Spockly Demo: Blockly in React
      </h1>
      <div style={{ display: "flex", height: "90vh" }}>
        {/* Blockly Editor */}
        <div style={{ flex: 1 }}>
          <BlocklyComponent setCode={setCode} />
        </div>

        {/* Code Output */}
        <div
          style={{
            flex: 1,
            padding: "1rem",
            overflow: "auto",
            background: "#f8f8f8",
          }}
        >
          <h2>Generated Python Code</h2>
          <CodeDisplay code={code} />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav style={{ padding: "1rem", background: "#ddd" }}>
        <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
        <Link to="/spockly" style={{ marginRight: "1rem" }}>SPOCKLY</Link>
        <Link to="/tutorials">Tutorials</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spockly" element={<SPOCKLY />} />
        <Route path="/tutorials" element={<Tutorials />} />
      </Routes>
    </Router>
  );
}

export default App;
