import React, { useEffect, useRef, useState } from "react";
import * as Blockly from "blockly";
import { pythonGenerator } from "blockly/python";
import GenerateButton from "./GenerateButton";
import CodeDisplay from "./CodeDisplay";

const BlocklyComponent = () => {
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);
  const [code, setCode] = useState("");

  useEffect(() => {
    if (!blocklyDiv.current) {
      console.error("blocklyDiv is not available.");
      return;
    }

    // Initialize Blockly workspace
    workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      toolbox: `
        <xml>
          <block type="controls_if"></block>
          <block type="logic_compare"></block>
          <block type="math_number"></block>
          <block type="math_arithmetic"></block>
          <block type="text_print"></block>
        </xml>
      `,
    });

    console.log("Blockly workspace initialized:", workspaceRef.current);

    return () => {
      workspaceRef.current?.dispose();
    };
  }, []);

  const generateCode = () => {
    if (!workspaceRef.current) {
      console.error("Blockly workspace is not initialized.");
      return;
    }

    const pythonCode = pythonGenerator.workspaceToCode(workspaceRef.current);
    setCode(pythonCode);
    console.log("Generated Python Code:\n", pythonCode);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div ref={blocklyDiv} style={{ height: "400px", width: "100%" }} />

      {/* Generate Code Button */}
      <GenerateButton onClick={generateCode} />

      {/* Code Display Box */}
      <CodeDisplay code={code} />
    </div>
  );
};

export default BlocklyComponent;
