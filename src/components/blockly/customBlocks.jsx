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
    this.setOutput(true, 'Number');
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(230);
  }
};
Blockly.common.defineBlocks({modulo: modulo});
                    
pythonGenerator.forBlock['modulo'] = function(block) {
  const number_a = block.getFieldValue('a');
  const number_b = block.getFieldValue('b');
  return [`${number_a}%${number_b}`, pythonGenerator.ORDER_MULTIPLICATIVE];
}

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
      return [`(${valu} & ${valu2})`, pythonGenerator.ORDER_LOGICAL_AND];
    case 'OR':
      return [`(${valu} | ${valu2})`, pythonGenerator.ORDER_LOGICAL_OR];
    case 'XOR':
      return [`(${valu} ^ ${valu2})`, pythonGenerator.ORDER_BITWISE_XOR];
    case 'NOT':
      return [`(not ${valu2})`, pythonGenerator.ORDER_LOGICAL_NOT];
  }
}

/************************
 * 
 * LOADING BLOCKS
 * 
 ************************/

/**
 * Basic loading block
 */

Blockly.Blocks["loading"] = {
  init: function(){
    this.appendDummyInput()
    .appendField('Load data from dataset:')
    .appendField(new Blockly.FieldTextInput('iris'), 'DATASET');
    this.setTooltip('Loads a given dataset');
    this.appendEndRowInput();
    this.setColour(200);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },
};
pythonGenerator.forBlock["loading"] = function(block, generator) {
  // const dataset = generator.valueToCode(block, 'DATASET', pythonGenerator.ORDER_NONE) || '0';
  const dataset = block.getFieldValue('DATASET') || '0';
  return `data(${dataset})\n`;
};

/**
 * Load csv file (using pandas)
 */
Blockly.Blocks['load_csv'] = {
  init: function(){
    this.appendDummyInput()
    .appendField('Load data from CSV:')
    .appendField(new Blockly.FieldTextInput('iris.csv', (txt) => {
      if(!~txt.indexOf('.csv')) txt = txt + '.csv';
      return txt
    }), 'CSV');
    this.setTooltip('Loads a given CSV dataset');
    this.appendEndRowInput();
    this.setColour(200);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },
};
pythonGenerator.forBlock['load_csv'] = function(block, generator) {
  const dataset = block.getFieldValue('CSV') || '0';
  return `pd.read_csv('${dataset}')\n`;
};

/**
 * Load CSV file from URL (using pandas)
 */

Blockly.Blocks['load_csv_from_url'] = {
  init: function(){
    this.appendDummyInput()
    .appendField('Load CSV file from URL')
    .appendField(new Blockly.FieldTextInput('http://example.com/iris.csv', (url) => {
      if(url.match(/^[a-z]{4,5}:\/\/[A-Za-zÀ-ÖØ-öø-ÿ0-9.\/:_-]*?\.[a-z]{2,6}/)) { return url } else { return 'ERROR!' }
    }), 'CSV');
    this.setTooltip('Loads a given CSV dataset from an URL. Local files can be used by prepending "file://".');
    this.appendEndRowInput();
    this.setColour(200);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },
};
pythonGenerator.forBlock['load_csv_from_url'] = function(block, generator) {
  const dataset = block.getFieldValue('CSV') || '0';
  return `pd.read_csv('${dataset}')\n`;
};
      
/** sqrt block**/
Blockly.Blocks["sqrt_of"] = {
  init: function () {
    this.appendValueInput("NUM").setCheck("Number").appendField("sqrt of");
    this.setOutput(true, "Number");
    this.setColour(230);
    this.setTooltip("Returns the sqrt of a number");
  },
};
pythonGenerator.forBlock["sqrt_of"] = function (block, generator) {
  const num =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return [`np.sqrt(${num})`, pythonGenerator.ORDER_ATOMIC];
};

/** exponentiel block**/
Blockly.Blocks["exp_of"] = {
  init: function () {
    this.appendValueInput("NUM").setCheck("Number").appendField("exp of");
    this.setOutput(true, "Number");
    this.setColour(230);
    this.setTooltip("Returns the exponential of a number");
  },
};
pythonGenerator.forBlock["exp_of"] = function (block, generator) {
  const num =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return [`np.exp(${num})`, pythonGenerator.ORDER_ATOMIC];
};

/** logarithm block**/
Blockly.Blocks["log_of"] = {
  init: function () {
    this.appendValueInput("NUM").setCheck("Number").appendField("log of");
    this.setOutput(true, "Number");
    this.setColour(230);
    this.setTooltip("Returns the exponential of a number");
  },
};
pythonGenerator.forBlock["log_of"] = function (block, generator) {
  const num =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return [`np.log(${num})`, pythonGenerator.ORDER_ATOMIC];
};

//** boolean blocks*/
const bool1 = {
  init: function() {
    this.appendDummyInput('')
      .appendField('True');
    this.setOutput(true, 'Boolean');
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(230);
  }
};
Blockly.common.defineBlocks({bool1: bool1});
pythonGenerator.forBlock['bool1'] = function() {
  return 'True';
}

const bool2 = {
  init: function() {
    this.appendDummyInput('')
      .appendField('False');
    this.setOutput(true, 'Boolean');
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(230);
  }
};
Blockly.common.defineBlocks({bool2: bool2});
pythonGenerator.forBlock['bool2'] = function() {
  return 'False';
}

/** 
 * Mean of array of numbers
 */
Blockly.Blocks["mean"] = {
  init: function () {
    this.appendValueInput("NUM")
    .setCheck("Array")
    .appendField("Mean of");
    this.setOutput(true, "Number");
    this.setColour(150);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Returns the mean of an array of numbers");
  },
};
pythonGenerator.forBlock["mean"] = function(block, generator) {
  const mean =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return [`np.mean(${mean})`, pythonGenerator.ORDER_ATOMIC];
};

/** 
 * Median of array of numbers
 */
Blockly.Blocks["median"] = {
  init: function () {
    this.appendValueInput("NUM")
    .setCheck("Array")
    .appendField("Median of");
    this.setOutput(true, "Number");
    this.setColour(150);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("Returns the median of an array of numbers");
  },
};
pythonGenerator.forBlock["median"] = function(block, generator) {
  const median =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return [`np.mean(${median})`, pythonGenerator.ORDER_ATOMIC];
};

/** 
 * Maximum of array of numbers
 */
const max = {
  init: function() {
    this.appendValueInput('maximum')
    .setCheck('Array')
      .appendField(new Blockly.FieldLabelSerializable('Maximum of'), 'MAXIMUM');
    this.setOutput(true, 'Number');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('"Returns the maximum of an array of numbers"');
    this.setHelpUrl('');
    this.setColour(150);
  }
};
Blockly.common.defineBlocks({max: max});

pythonGenerator.forBlock["max"] = function(block, generator) {
  const maxi =
    generator.valueToCode(block, "maximum", pythonGenerator.ORDER_NONE) || "0";
  return [`np.max(${maxi})`, pythonGenerator.ORDER_ATOMIC];
};
                    

/************************
 * 
 * VARIABLE BLOCKS
 * 
 ************************/

/** 
 *  Block for variable getter.
 */
Blockly.Blocks['variables_get'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable("VAR_NAME"), "FIELD");
    this.setOutput(true, null);
    this.setColour(95);
  }
};
pythonGenerator.forBlock["variables_get"] = function(block, generator) {
  return null
};

/** 
 * Block for variable setter.
 */
Blockly.Blocks['variables_set'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(null)
        .appendField("set")
        .appendField(new Blockly.FieldVariable("VAR_NAME"), "FIELD")
        .appendField("to");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(95);
    this.setOutput(true, null);
  }
};
pythonGenerator.forBlock["variables_set"] = function(block, generator) {
  const varID = block.getFieldValue('FIELD') || '0';
  const workspace = block.workspace;
  const getVar = workspace.getVariableById(varID);
  const varName = getVar ? getVar.name : 'undefined';
  const value = generator.valueToCode(block, "NAME", pythonGenerator.ORDER_ATOMIC) || 'None';
  return [`\n${varName} = ${value}`, pythonGenerator.ORDER_ATOMIC];
};


//**Shape of data */
const Data_shape = {
  init: function() {
    this.appendValueInput('data')
    .setCheck('Array')
      .appendField(new Blockly.FieldLabelSerializable('Data shape'), 'DATA SHAPE');
    this.setInputsInline(true)
    this.setOutput(true, 'tuple');
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(200);
  }
};
Blockly.common.defineBlocks({Data_shape: Data_shape});

pythonGenerator.forBlock['Data_shape'] = function(block,generator) {
  const data = generator.valueToCode(block, 'data', pythonGenerator.ORDER_ATOMIC);
  return [`np.shape(${data})`, pythonGenerator.ORDER_COLLECTION];
}

//**stacking data */
const stacking = {
  init: function() {
    this.appendValueInput('db1')
    .setCheck('Array')
      .appendField(new Blockly.FieldLabelSerializable('stacking by'), 'NAME')
      .appendField(new Blockly.FieldDropdown([
          ['columns', 'COLUMNS'],
          ['rows', 'ROWS']
        ]), 'type');
    this.appendValueInput('db2')
    .setCheck('Array');
    this.setInputsInline(true)
    this.setOutput(true, 'Array');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(200);
  }
};
Blockly.common.defineBlocks({stacking: stacking});

pythonGenerator.forBlock['stacking'] = function(block, generator) {
  const dropdown_type = block.getFieldValue('type');
  const db1 = generator.valueToCode(block, 'db1', pythonGenerator.ORDER_COLLECTION);
  const db2 = generator.valueToCode(block, 'db2', pythonGenerator.ORDER_COLLECTION);
  switch (dropdown_type) {
    case 'COLUMNS':
      return [`np.hstack((${db1},${db2}))`, pythonGenerator.ORDER_COLLECTION];
    case 'ROWS':
      return [`np.vstack((${db1},${db2}))`, pythonGenerator.ORDER_COLLECTION];
  }
}

//** create an array*/
const create_array = {
  init: function() {
    this.appendValueInput('array')
    .setCheck(['Number', 'Boolean', 'String', 'List', 'Matrix'])
      .appendField(new Blockly.FieldLabelSerializable('create array of'), 'CREATE');
    this.setOutput(true, 'Array');
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(200);
  }
};
Blockly.common.defineBlocks({create_array: create_array});

pythonGenerator.forBlock['create_array'] = function(block,generator) {
  const array = generator.valueToCode(block, 'array', pythonGenerator.ORDER_ATOMIC);
  return [`np.array(${array})`, pythonGenerator.ORDER_COLLECTION];
}             

//**Delete in an array */
const delete_object = {
  init: function() {
    this.appendValueInput('object')
    .setCheck(['Array', 'Number'])
      .appendField(new Blockly.FieldLabelSerializable('delete'), 'DELETE');
    this.appendValueInput('array')
    .setCheck('Array')
      .appendField(new Blockly.FieldLabelSerializable('in'), 'IN');
    this.setInputsInline(true)
    this.setOutput(true, 'Array');
    this.setTooltip('Delete an object in an array');
    this.setHelpUrl('');
    this.setColour(195);
  }
};
Blockly.common.defineBlocks({delete_object: delete_object});

pythonGenerator.forBlock['delete_object'] = function(block,generator) {
  const value_object = generator.valueToCode(block, 'object', pythonGenerator.ORDER_ATOMIC);
  const value_array = generator.valueToCode(block, 'array', pythonGenerator.ORDER_COLLECTION);
  return [`np.delete(${value_array}, ${value_object})`, pythonGenerator.ORDER_COLLECTION];
}