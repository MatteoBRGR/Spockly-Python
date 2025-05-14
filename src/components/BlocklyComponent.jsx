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
            <block type="consts"></block>
            <block type="math_arithmetic">
              <field name="OP">ADD</field>
              <value name="A">
                <shadow type="math_number">
                  <field name="NUM">1</field>
                </shadow>
              </value>
              <value name="B">
                <shadow type="math_number">
                  <field name="NUM">1</field>
                </shadow>
              </value>
            </block>
            <block type="logic_compare"></block>
            <block type="math_square"></block>
            <block type="sqrt_of"></block>
            <block type="exp_of"></block>
            <block type="log_of"></block>
            <block type="trigo"></block>
            <block type="round"></block>
            <block type="modulo"></block>
          </category>
          <category name="Booleans" colour="#1d8425">
            <block type="to_bool"></block>
            <block type="bool1"></block>
            <block type="bool2"></block>
          </category>
          <category name="Data" colour="#FA2">
            <block type="load_csv"></block>
            <block type="load_csv_from_url"></block>
            <block type="load_txt"></block>
            <block type="load_json"></block>
            <block type="data_shape"></block>
            <block type="stacking"></block>
            <block type="add_object"></block>
            <block type="delete_object"></block>
            <block type="create_array"></block>
            <block type="list_filter"></block>
            <block type="sort"></block>
            <block type="reshape"></block>
            <block type="slice_file"></block>
          </category>
          <category name="Visualisation" colour="#c124ba">
            <block type="create_data_and_output"></block>
            <block type="def_download"></block>
            <block type="func_download"></block>
            <block type="read_file"></block>
            <block type="write_file"></block>
            <block type="plot">
              <value name="title">
                <shadow type="text">
                  <field name="TEXT">Title</field>
                </shadow>
              </value>
              <value name="XLabel">
                <shadow type="text">
                  <field name="TEXT">X-axis</field>
                </shadow>
              </value>
              <value name="YLabel">
                <shadow type="text">
                  <field name="TEXT">Y-axis</field>
                </shadow>
              </value>
              <value name="Legend">
                <shadow type="text">
                  <field name="TEXT">Legend</field>
                </shadow>
              </value>
            </block>
            <block type="scatter">
              <value name="title">
                <shadow type="text">
                  <field name="TEXT">Title</field>
                </shadow>
              </value>
              <value name="XLabel">
                <shadow type="text">
                  <field name="TEXT">X-axis</field>
                </shadow>
              </value>
              <value name="YLabel">
                <shadow type="text">
                  <field name="TEXT">Y-axis</field>
                </shadow>
              </value>
              <value name="Legend">
                <shadow type="text">
                  <field name="TEXT">Legend</field>
                </shadow>
              </value>
            </block>
          </category>
          <category name="Statistics" colour="#B6C">
            <block type="mean"></block>
            <block type="median"></block>
            <block type="std"></block>
            <block type="mean_squared"></block>
            <block type="max"></block>
            <block type="min"></block>
            <block type="sum"></block>
          </category>
          <category name="Variables" custom="VARIABLE" colour="#a55b80"></category>
          <category name="Imports" colour="#888">
            <block type="import0"></block>
            <block type="import1"></block>
            <block type="import2"></block>
            <block type="import3"></block>
          </category>
          <category name="Basic functions" colour="#A6200B">
            <block type="input"></block>
            <block type="slice"></block>
            <block type="lambda"></block>
            <block type="text_print"></block>
            <block type="length_of_str"></block>
            <block type="list_access"></block>
          </category>
          <category name="Functions" custom="PROCEDURE" colour="#05a219"></category>
          <category name="Geometry" colour="#763728">
            <block type="coords"></block>
            <block type="create_point"></block>
            <block type="buffer"></block>
            <block type="line_segment"></block>
            <block type="polygon"></block>
            <block type="distance_calc"></block>
            <block type="multipolygon"></block>
            <block type="polygon_area"></block>
            <block type="polygon_perimeter"></block>
            <block type="bounding_box"></block>
          </category>
          <category name="Other" colour="#5C81A6">
            <block type="controls_if"></block>
            <block type="operators"></block>
            <block type="repeat_times"></block>
            <block type="temp_var"></block>
            <block type="text"></block>
            <block type="line_break"></block>
            <block type="list_create"></block>
            <block type="arange">
              <value name="start">
                <shadow type="math_number">
                  <field name="NUM">0</field>
                </shadow>
              </value>
              <value name="stop">
                <shadow type="math_number">
                  <field name="NUM">100</field>
                </shadow>
              </value>
              <value name="step">
                <shadow type="math_number">
                  <field name="NUM">1</field>
                </shadow>
              </value>
            </block>
            <block type="linspace">
              <value name="number">
                <shadow type="math_number">
                  <field name="NUM">0</field>
                </shadow>
              </value>
              <value name="start">
                <shadow type="math_number">
                  <field name="NUM">10</field>
                </shadow>
              </value>
              <value name="stop">
                <shadow type="math_number">
                  <field name="NUM">100</field>
                </shadow>
              </value>
            </block>
          </category>
        </xml>
      `
    });

    return () => {
      workspaceRef.current?.dispose();
    };
  }, []);

  const generateCode = () => {
    if (!workspaceRef.current) {
      console.error("Blockly workspace is not initialised.");
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
