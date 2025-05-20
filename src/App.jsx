import React, { useState, useEffect } from "react";
import BlocklyComponent from "./components/BlocklyComponent";
import CodeDisplay from "./components/CodeDisplay";
import Pyodide from "./components/Pyodide";

function App() {
  const [code, setCode] = useState("");

  useEffect(() => {
    document.getElementById('toast').style.animation = 'slideIn 5s ease-in-out';
    document.getElementById('toast').style.display = 'block';
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw", margin: 0, padding: 0, overflow: "hidden" }}>
      <h1 style={{ textAlign: "center", margin: "0.5rem 0" }}>
        Spockly Demo: Blockly in React
      </h1>
      <div>
        <div id="toast"
          style={{
            position: "absolute",
            fontSize: "20px",
            color: "orange",
            zIndex: 100,
            float: "right",
            overflow: "hidden",
            right: "10px",
            backgroundColor: "#FEFEFE",
            boxShadow: "-1px 1px 10px #9f9f9f",
            padding: "0 10px 0 10px",
            borderRadius: "3px",
            margin: "10px",
            display: "none"
          }}
        >
          <p>Loading libraries...</p>
        </div>
      </div>
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
          <hr />
          <h2>Output</h2>
          <Pyodide code={code} />
        </div>
      </div>
    </div>
    
  );
}

export default App;
