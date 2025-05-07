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
 * 6. Length of str (returns int)
 */
Blockly.Blocks["length_of_str"] = {
  init: function(){
    this.appendValueInput('STR')
    .appendField('length of:')
    .setCheck('String');
    this.appendDummyInput();
    this.appendEndRowInput();
    this.setOutput(true, 'Number');
    this.setColour(90);
    this.setTooltip('Returns the length of a given string');
  },
};
pythonGenerator.forBlock["length_of_str"] = function(block, generator) {
  const length = generator.valueToCode(block, 'STR', pythonGenerator.ORDER_NONE) || '0';
  return [`len(${length})`, pythonGenerator.ORDER_ATOMIC];
};

/**Block modulo**/
const modulo = {
  init: function() {
    this.appendValueInput('NAME')
    .setAlign(Blockly.inputs.Align.RIGHT)
      .appendField(new Blockly.FieldNumber(0), 'a')
      .appendField(new Blockly.FieldLabelSerializable('modulo'), 'NAME')
      .appendField(new Blockly.FieldNumber(0), 'b');
    this.setOutput(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(120);
  }
};
Blockly.common.defineBlocks({modulo: modulo});
                    
pythonGenerator.forBlock['modulo'] = function(block) {
  const number_a = block.getFieldValue('a');
  const number_b = block.getFieldValue('b');
  return [`${number_a}%${number_b}`, pythonGenerator.ORDER_NONE];
}
                    
/**
 * Loading block
 */
//TBD
Blockly.Blocks["loading"] = {
  init: function(){
    this.appendDummyInput()
    .appendField('Load data from dataset:')
    .appendField(new Blockly.FieldTextInput('iris'), 'DATASET');
    // this.setCheck('String')
    this.setTooltip('Loads a given dataset');
    this.appendEndRowInput();
    this.setColour(200);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },
};
pythonGenerator.forBlock["loading"] = function(block, generator) {
  const dataset = generator.valueToCode(block, 'DATASET', pythonGenerator.ORDER_NONE) || '0';
  return [`data(${dataset})`, pythonGenerator.ORDER_ATOMIC];
};

/**
 * Operators block
 */

const operators = {
  init: function() {
    this.appendValueInput('VALUE')
    .setAlign(Blockly.inputs.Align.RIGHT)
    .setCheck('Boolean');
    this.appendValueInput('VALUE2')
    .setCheck('Boolean')
      .appendField(new Blockly.FieldDropdown([
          ['XOR', 'XOR'],
          ['AND', 'AND'],
          ['OR', 'OR'],
          ['NOT', 'NOT']
        ]), 'NAME');
    this.setInputsInline(true)
    this.setOutput(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(0);
  }
};
Blockly.common.defineBlocks({operators: operators});

pythonGenerator.forBlock['operators'] = function(block,generator) {
  
  const dropdown_name = block.getFieldValue('NAME');
  const valu = generator.valueToCode(block, 'VALUE', pythonGenerator.ORDER_ATOMIC);
  const valu2 = generator.valueToCode(block, 'VALUE2', pythonGenerator.ORDER_ATOMIC);

  switch (dropdown_name) {
    case 'AND':
      return [`${valu}&${valu2}`, pythonGenerator.ORDER_NONE];
    case 'OR':
      return [`${valu}|${valu2}`, pythonGenerator.ORDER_NONE];
    case 'XOR':
      return [`${valu}^${valu2}`, pythonGenerator.ORDER_NONE];
    case 'NOT':
      return [`not ${valu2}`, pythonGenerator.ORDER_NONE];
  }
}
