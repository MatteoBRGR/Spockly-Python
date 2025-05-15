import React, { useEffect, useState } from "react";

const Pyodide = ({ code }) => {
    const [output, setOutput] = useState("");
    const [pyodide, setPyodide] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadPyodideAndPackages = async () => {
            try {
                const pyodideInstance = await window.loadPyodide({
                    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.5/full/"
                });
                
                // Redirect Python stdout to capture print statements
                pyodideInstance.globals.set("print", (s) => {
                    setOutput(prev => prev + s + "\n");
                });
                
                setPyodide(pyodideInstance);
                setIsLoading(false);
            } catch (error) {
                console.error("Error loading Pyodide:", error);
                setOutput("Error loading Pyodide");
                setIsLoading(false);
            }
        };
        loadPyodideAndPackages();
    }, []);

    useEffect(() => {
        const runCode = async () => {
            if (pyodide && code) {
              code = "import pandas as pd\n" + "import numpy as np\n" + "import geopandas as gpd\n" + "import matplotlib.pyplot as plt\n" + "from shapely.geometry import Polygon, LineString, Point, MultiPolygon\n\n" + code;
              console.log(code);
                await pyodide.loadPackage("pandas");
                await pyodide.loadPackage("geopandas");
                await pyodide.loadPackage("matplotlib");
                await pyodide.loadPackage("requests");
                setOutput("");
                try {
                    const result = await pyodide.runPython(code);
                    if (result !== undefined && result !== null) {
                        setOutput(prev => prev + result.toString());
                    }
                } catch (error) {
                    console.error("Error running Python code:", error);
                    setOutput(`Error: ${error.message}`);
                }
            }
        };
        runCode();
    }, [pyodide, code]);

    return (
        <div style={{ 
            padding: '1rem',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            minHeight: '100px'
        }}>
            {isLoading ? (
                <div>Loading Pyodide...</div>
            ) : (
                <pre style={{
                    backgroundColor: "#f4f4f4",
                    padding: "10px",
                    borderRadius: "5px",
                    textAlign: "left",
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                    border: "1px solid #ddd",
                    minHeight: "50px",
                }}>
                    {output || 'No output'}
                </pre>
            )}
        </div>
    );
};

export default Pyodide;