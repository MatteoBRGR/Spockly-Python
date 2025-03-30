import React, { useEffect, useRef } from "react";
import * as Blockly from "blockly";

const BlocklyComponent = () => {
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);

  useEffect(() => {
    // Initialize Blockly workspace
    workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      toolbox: `
        <xml>
          <block type="controls_if"></block>
          <block type="logic_compare"></block>
          <block type="math_number"></block>
          <block type="math_arithmetic"></block>
        </xml>
      `,
    });

    return () => {
      workspaceRef.current.dispose(); // Clean up Blockly on unmount
    };
  }, []);

  return <div ref={blocklyDiv} style={{ height: "500px", width: "100%" }} />;
};

export default BlocklyComponent;
