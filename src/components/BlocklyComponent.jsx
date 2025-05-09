import React, { useEffect, useRef } from "react";
import * as Blockly from "blockly";
import { pythonGenerator } from "blockly/python";
import GenerateButton from "./GenerateButton";
import "./blockly/customBlocks"; // Import custom blocks

const BlocklyComponent = ({ setCode }) => {
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);

  useEffect(() => {
    if (!blocklyDiv.current) {
      console.error("blocklyDiv is not available.");
      return;
    }

    // Initialize Blockly workspace
    workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      toolbox: `
        <xml>
          <category name="Math" colour="#A9A9A9">
            <block type="math_number"></block>
            <block type="math_arithmetic"></block>
            <block type="logic_compare"></block>
            <block type="bool1"></block>
            <block type="bool2"></block>
            <block type="math_square"></block>
            <block type="sqrt_of"></block>
            <block type="exp_of"></block>
            <block type="log_of"></block>              
            <block type="modulo"></block>          
          </category>
          <category name="Data" colour="#FA2">
            <block type="loading"></block>
            <block type="load_csv"></block>
            <block type="load_csv_from_url"></block>
            <block type="Data_shape"></block>
            <block type="stacking"></block>
            <block type="delete_object"></block>
            <block type="create_array"></block>
          </category>
          <category name="Statistics" colour="#B6C">
            <block type="mean"></block>
            <block type="median"></block>
            <block type="std"></block>
            <block type="mean_squared"></block>
            <block type="max"></block>
          </category>
          <category name="Variables" colour="#B52">
            <block type="variables_get"></block>
            <block type="variables_set"></block>
          </category>
          <category name="Other" colour="#5C81A6">
            <block type="controls_if"></block>
            <block type="repeat_times"></block> 
            <block type="text"></block>
            <block type="text_print"></block>
            <block type="length_of_str"></block>
            <block type="operators"></block>
          </category>
        </xml>
      `,
    });

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
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div ref={blocklyDiv} style={{ flex: 1, width: "100%" }} />
      <div style={{ marginTop: "0.5rem", textAlign: "center" }}>
        <GenerateButton onClick={generateCode} />
      </div>
    </div>
  );
};

export default BlocklyComponent;
