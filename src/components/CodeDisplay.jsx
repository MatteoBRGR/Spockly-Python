import React from "react";

const CodeDisplay = ({ code }) => {
  return (
    <pre
      style={{
        backgroundColor: "#f4f4f4",
        padding: "10px",
        borderRadius: "5px",
        textAlign: "left",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
        border: "1px solid #ddd",
        minHeight: "50px",
      }}
    >
      {"import pandas as pd\n" + "import numpy as np\n" + "import geopandas as gpd\n" + "from shapely.geometry import Polygon, LineString, Point, MultiPolygon\n\n" + code || "Generated Python code will appear here..."}
    </pre>
  );
};

export default CodeDisplay;
// This component is a simple display area for the generated Python code.
