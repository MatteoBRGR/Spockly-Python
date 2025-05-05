import * as Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

/**
 * 1. Statement Block (no input)
 */
Blockly.Blocks["print_hello"] = {
  init: function () {
    this.appendDummyInput().appendField("Say Hello");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("Prints a hello message");
  },
};
pythonGenerator.forBlock["print_hello"] = function () {
  return "print('Hello from custom block')\n";
};

/**
 * 2. Value Input Block (returns value)
 */
Blockly.Blocks["math_square"] = {
  init: function () {
    this.appendValueInput("NUM").setCheck("Number").appendField("square of");
    this.setOutput(true, "Number");
    this.setColour(230);
    this.setTooltip("Returns the square of a number");
  },
};
pythonGenerator.forBlock["math_square"] = function (block, generator) {
  const num =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return [`(${num} ** 2)`, pythonGenerator.ORDER_ATOMIC];
};

/**
 * 3. Text Block (returns string)
 */
Blockly.Blocks["text_greeting"] = {
  init: function () {
    this.appendValueInput("NAME").setCheck("String").appendField("greet");
    this.setOutput(true, "String");
    this.setColour(65);
    this.setTooltip("Returns a greeting with a name");
  },
};
pythonGenerator.forBlock["text_greeting"] = function (block, generator) {
  const name =
    generator.valueToCode(block, "NAME", pythonGenerator.ORDER_NONE) || "''";
  return [`('Hello, ' + ${name})`, pythonGenerator.ORDER_ATOMIC];
};

/**
 * 4. Statement Input Block (loop)
 */
Blockly.Blocks["repeat_times"] = {
  init: function () {
    this.appendValueInput("TIMES").setCheck("Number").appendField("repeat");
    this.appendStatementInput("DO").appendField("do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip("Repeat N times");
  },
};
pythonGenerator.forBlock["repeat_times"] = function (block, generator) {
  const times =
    generator.valueToCode(block, "TIMES", pythonGenerator.ORDER_NONE) || "0";
  const branch = generator.statementToCode(block, "DO");
  return `for i in range(${times}):\n${branch}`;
};

/**
 * 5. Dropdown Field Block
 */
Blockly.Blocks["dropdown_color"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("favorite color")
      .appendField(
        new Blockly.FieldDropdown([
          ["Red", "RED"],
          ["Green", "GREEN"],
          ["Blue", "BLUE"],
        ]),
        "COLOR"
      );
    this.setOutput(true, "String");
    this.setColour(20);
    this.setTooltip("Returns selected color");
  },
};
pythonGenerator.forBlock["dropdown_color"] = function (block) {
  const color = block.getFieldValue("COLOR");
  return [`"${color.toLowerCase()}"`, pythonGenerator.ORDER_ATOMIC];
};

/**
 * 6. length of str
 */
Blockly.Blocks["length_of_str"] = {
  init: function(){
    this.appendValueInput()
    .setCheck('String')
    .appendField('length of:');
    this.setOutput(true, 'Number');
    this.setColour(90);
    this.setTooltip('Returns the length of a given string')
  }
}