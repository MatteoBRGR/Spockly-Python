import React, { useEffect, useState, useRef } from "react";
import { Box, Fab, Stack, Typography } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { darkTheme, lightTheme } from "./../appTheme";

const Pyodide = ({ code, isDarkMode }) => {
    const [output, setOutput] = useState("Loading Pyodide...");
    const [pyodide, setPyodide] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const printProxyRef = useRef(null); 
    const theme = isDarkMode ? darkTheme : lightTheme;

    useEffect(() => {
        const loadPyodideAndPackages = async () => {
            try {
                if (!window.loadPyodide) {
                    throw new Error("Pyodide script not loaded.");
                }
                let pyodideInstance = await window.loadPyodide({
                    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.5/full/"
                });
                const print_proxy = (s) => {
                    console.info('%cOutput:\n', 'font-size:1em; color: violet', s);
                    if (typeof s === "function") {
                        s = s.toString();
                        setOutput(prev => prev + "[Warning] Printing functions/lambdas is not supported in this Pyodide version." +
                                                 "\nHowever, this is the stringified version of the given function:\n\n" + s);
                    } else if (typeof s === "object") {
                        s = s.toString();
                        setOutput(prev => prev + s + "\n");
                    } else {
                        setOutput(prev => prev + s + "\n");
                    }
                };
                printProxyRef.current = pyodideInstance.toPy(print_proxy);
                pyodideInstance.globals.set("print", printProxyRef.current);
                setPyodide(pyodideInstance);
                setIsLoading(false);
            } catch (error) {
                console.error("Error loading Pyodide:", error);
                setOutput("Error loading Pyodide: " + error.toString());
                setIsLoading(false);
            }
        };
        loadPyodideAndPackages();
        return () => {
            if (pyodide && pyodide.globals && pyodide.globals.get("print")) {
                try {
                    pyodide.globals.get("print").destroy();
                } catch (e) {
                    console.error(e)
                }
            }
            printProxyRef.current = null;
        };
    }, []);

const firstRunRef = useRef(false);
    // useEffect(() => {
        const first = async () => {
            if (pyodide && !firstRunRef.current) {
                firstRunRef.current = true;
                console.log('Imports are loading:');
                // Install pandas and other core packages
                await pyodide.loadPackage("pandas");
                await pyodide.loadPackage("geopandas");
                // await pyodide.loadPackage("matplotlib");
                await pyodide.loadPackage("requests");
                // await pyodide.loadPackage("micropip");
                await pyodide.loadPackage("pytest");
                // const micropip = pyodide.pyimport("micropip");

                var initCode =
                    "import pandas as pd\n" +
                    "import numpy as np\n" +
                    "import geopandas as gpd\n" +
                    // "import matplotlib.pyplot as plt\n" +
                    "from shapely.geometry import Polygon, LineString, Point, MultiPolygon\n\n";
                await pyodide.runPython(initCode);
                console.info('Imports loaded!'); //Do not change this msg

//                 const patchReadCsv = `import pytest #; pytest.skip("Can't use top level await in doctests")
// original_read_csv = pd.read_csv
// res = pyfetch("http://gist.githubusercontent.com/netj/8836201/raw/6f9306ad21398ea43cba4f7d537619d0e07d5ae3/iris.csv")
// print(res.ok)
// print(res.status)
// print(res)
// intercepted_read_csv = lambda *args, **kwargs: original_read_csv(res.url, *args, **kwargs)`;
//                 await pyodide.runPython(patchReadCsv);
// await fetchAndLoadCsv(
//   pyodide,
//   "https://gist.githubusercontent.com/netj/8836201/raw/6f9306ad21398ea43cba4f7d537619d0e07d5ae3/iris.csv"
// );
            }
        }
        first();
    // }, [pyodide]);

    const ensureImports = async () => {
        if (!pyodide) return false;
        try {
            await pyodide.loadPackage("import pandas");
            await pyodide.loadPackage("pandas");
            await pyodide.loadPackage("geopandas");
            // await pyodide.loadPackage("matplotlib");
            await pyodide.loadPackage("requests");
            // await pyodide.loadPackage("micropip");
            await pyodide.loadPackage("pytest");
            return true;
        } catch {
            return false;
        }
    };

    // useEffect(() => {
        const runCode = async () => {
          if (!pyodide || !code) return;
            const importsOK = await ensureImports();
            if (!importsOK) {
              console.log('Imports not OK!');
                setIsLoading(true);
                await first();
              console.log('Imports loaded again!');
                setIsLoading(false);
            }
            if (pyodide && code) {
                code =  "import pandas as pd\n" +
                        "import numpy as np\n" +
                        "import geopandas as gpd\n" +
                        // "import matplotlib.pyplot as plt\n" +
                        "from shapely.geometry import Polygon, LineString, Point, MultiPolygon\n\n" + code;
                console.log("%cThis code is being compiled:\n", "font-size: 2em; color: violet", "\n" + code);
                pyodide.setDebug(true);
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
        // runCode();
    // }, [pyodide, code]);
    
    useEffect(() => {
        const findInfo = () => {
            const cslInfo = console.info;
            console.info = function(message) {
                onInfo(message);
            };

            function onInfo(message){
                cslInfo(message);
                if (message === 'Imports loaded!') {
                    document.getElementById('toast').style.color = '#089d08';
                    document.querySelector('#toast p').innerHTML = 'Libraries loaded!';
                    document.getElementById('toast').style.animation = 'slideOut 5s ease-in-out';
                    setTimeout(() => document.getElementById('toast').style.display = 'none', 5100);
                }
            }
        };
        findInfo();
    });
    
//     const fetchAndLoadCsv = async (pyodide, url, variableName = "df") => {
//         const response = await fetch(url);
//         const csvText = await response.text();
//         const pythonCode = `
// import pandas as pd
// # ${variableName} = pd.read_csv('${url}')
// # print(${csvText});
// `;
//         await pyodide.runPython(pythonCode);
//     };

    /**
     * <div>
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
                    { output || 'No output' }
                </pre>
            )}
        </div>
     */

    return (
        <Box
      sx={{
        top: 20,
        left: 20,
        right: 20,
        height: "100%",
        borderRadius: "5px",
        zIndex: 1,
      }}
    >
      <Stack direction="row">
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            color: theme.palette.primary.light,
            paddingBottom: "15px",
          }}
        >
          Output
        </Typography>

        <Fab
          size="small"
          variant="extended"
          sx={{
            left: 20,
            width: "140px",
            bgcolor: "#33bfff",
            color: theme.palette.primary.light,
            "&:hover": {
              bgcolor: "#00b0ff",
            },
            boxShadow: "none",
          }}
          onClick={runCode}
        >
          <Box display="flex" alignItems="center" gap={0.5}>
            <PlayArrow fontSize="small" />
            <Typography fontWeight="bold">Run Python Code</Typography>
          </Box>
        </Fab>
      </Stack>

      <Box
        sx={{
          position: "relative",
          borderRadius: "5px",
          width: "100%",
          height: "75%",
          bgcolor: theme.palette.background.paper,
          zIndex: 1,
        }}
      >
        <Typography
          fontWeight="bold"
          sx={{
            color: theme.palette.primary.contrastText,
            paddingBottom: "10px",
            padding: "20px",
            whiteSpace: 'pre-line',
          }}
        >
          {output}
        </Typography>
      </Box>
    </Box>
    );
};

export default Pyodide;