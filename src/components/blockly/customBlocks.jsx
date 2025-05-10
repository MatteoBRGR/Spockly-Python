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

// /**
//  * 3. Text Block (returns string)
//  */
// Blockly.Blocks["text_greeting"] = {
//   init: function () {
//     this.appendValueInput("NAME").setCheck("String").appendField("greet");
//     this.setOutput(true, "String");
//     this.setColour(65);
//     this.setTooltip("Returns a greeting with a name");
//   },
// };
// pythonGenerator.forBlock["text_greeting"] = function (block, generator) {
//   const name =
//     generator.valueToCode(block, "NAME", pythonGenerator.ORDER_NONE) || "''";
//   return [`('Hello, ' + ${name})`, pythonGenerator.ORDER_ATOMIC];
// };

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

// /**
//  * 5. Dropdown Field Block
//  */
// Blockly.Blocks["dropdown_color"] = {
//   init: function () {
//     this.appendDummyInput()
//       .appendField("favorite color")
//       .appendField(
//         new Blockly.FieldDropdown([
//           ["Red", "RED"],
//           ["Green", "GREEN"],
//           ["Blue", "BLUE"],
//         ]),
//         "COLOR"
//       );
//     this.setOutput(true, "String");
//     this.setColour(20);
//     this.setTooltip("Returns selected color");
//   },
// };
// pythonGenerator.forBlock["dropdown_color"] = function (block) {
//   const color = block.getFieldValue("COLOR");
//   return [`"${color.toLowerCase()}"`, pythonGenerator.ORDER_ATOMIC];
// };

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
  return `len(${length})`;
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
    this.setTooltip('Module: returns the remainder of a division');
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
    this.setTooltip('All the basic logical operators');
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
  return `np.sqrt(${num})`;
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
  return `np.exp(${num})`;
};

/** logarithm block**/
Blockly.Blocks["log_of"] = {
  init: function () {
    this.appendValueInput("NUM").setCheck("Number").appendField("log of");
    this.setOutput(true, "Number");
    this.setColour(230);
    this.setTooltip("Returns the logarithm of a number");
  },
};
pythonGenerator.forBlock["log_of"] = function (block, generator) {
  const num =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return `np.log(${num})`;
};

/** sinus block**/
Blockly.Blocks["sin"] = {
  init: function () {
    this.appendValueInput("NUM").setCheck("Number").appendField("sin");
    this.setOutput(true, "Number");
    this.setColour(230);
    this.setTooltip("Returns the sinus of a number");
  },
};
pythonGenerator.forBlock["sin"] = function (block, generator) {
  const num =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return `np.sin(${num})`;
};

/** cosinus block**/
Blockly.Blocks["cos"] = {
  init: function () {
    this.appendValueInput("NUM").setCheck("Number").appendField("cos");
    this.setOutput(true, "Number");
    this.setColour(230);
    this.setTooltip("Returns the cosinus of a number");
  },
};
pythonGenerator.forBlock["cos"] = function (block, generator) {
  const num =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return `np.cos(${num})`;
};

/** tangente block**/
Blockly.Blocks["tan"] = {
  init: function () {
    this.appendValueInput("NUM").setCheck("Number").appendField("tan");
    this.setOutput(true, "Number");
    this.setColour(230);
    this.setTooltip("Returns the tangente of a number");
  },
};
pythonGenerator.forBlock["tan"] = function (block, generator) {
  const num =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return `np.tan(${num})`;
};

/** round block**/
Blockly.Blocks["round"] = {
  init: function () {
    this.appendValueInput("NUM").setCheck("Number").appendField("round");
    this.setOutput(true, "Number");
    this.setColour(230);
    this.setTooltip("Returns the unit round of a number");
  },
};
pythonGenerator.forBlock["round"] = function (block, generator) {
  const num =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return `np.round(${num})`;
};

//** boolean blocks*/
const bool1 = {
  init: function() {
    this.appendDummyInput('')
      .appendField('True');
    this.setOutput(true, 'Boolean');
    this.setTooltip('Boolean value True');
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
    this.setTooltip('Boolean value False');
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
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Returns the mean of an array of numbers");
  },
};
pythonGenerator.forBlock["mean"] = function(block, generator) {
  const mean =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return `np.mean(${mean})`;
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
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("Returns the median of an array of numbers");
  },
};
pythonGenerator.forBlock["median"] = function(block, generator) {
  const median =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return `np.median(${median})`;
};

/** 
 * Sum of array of numbers
 */
Blockly.Blocks["sum"] = {
  init: function () {
    this.appendValueInput("NUM")
    .setCheck("Array")
    .appendField("Sum of");
    this.setOutput(true, "Number");
    this.setColour(150);
    this.setPreviousStatement(true, null);
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setTooltip("Returns the sum of an array of numbers");
  },
};
pythonGenerator.forBlock["sum"] = function(block, generator) {
  const sum =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return `np.sum(${sum})`;
};

/** 
 * Standard deviation of array of numbers
 */
Blockly.Blocks["std"] = {
  init: function () {
    this.appendValueInput("NUM")
    .setCheck("Array")
    .appendField("Standard deviation of");
    this.setOutput(true, "Number");
    this.setColour(150);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Returns the standard deviation of an array of numbers");
  },
};
pythonGenerator.forBlock["std"] = function(block, generator) {
  const std =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return `np.std(${std})`;
};

/** 
 * mean squared error of array of numbers
 */
Blockly.Blocks["mean_squared"] = {
  init: function () {
    this.appendValueInput("NUM")
    .setCheck("Array")
    .appendField("Mean squared error of");
    this.setOutput(true, "Number");
    this.setColour(150);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Returns the mean squared error of an array of numbers");
  },
};
pythonGenerator.forBlock["mean_squared"] = function(block, generator) {
  const msq =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return `(quad_err = 0\nfor i in range(${msq}.shape[0]) :\n  quad_err += (${msq}[i,0] - np.mean(${msq}))**2\n
quad_err /= ${msq}.shape[0])\n`;
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
  return `np.max(${maxi})`;
};

/** 
 * Minimum of array of numbers
 */
const min = {
  init: function() {
    this.appendValueInput('minimum')
    .setCheck('Array')
      .appendField(new Blockly.FieldLabelSerializable('Minimum of'), 'MINIMUM');
    this.setOutput(true, 'Number');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Returns the minimum of an array of numbers');
    this.setColour(150);
  }
};
Blockly.common.defineBlocks({min: min});

pythonGenerator.forBlock["min"] = function(block, generator) {
  const mini =
    generator.valueToCode(block, "minimum", pythonGenerator.ORDER_NONE) || "0";
  return `np.min(${mini})`;
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
    this.appendDummyInput('FIELD1')
      .appendField(new Blockly.FieldVariable("VAR_NAME"), "FIELD1");
    this.setOutput(true, null);
    this.setColour(95);
  }
};
pythonGenerator.forBlock["variables_get"] = function(block, generator) {
  const varID = block.getFieldValue('FIELD1') || '0';
  const workspace = block.workspace;
  const getVar = workspace.getVariableById(varID);
  const varName = getVar ? getVar.name : 'undefined';
  return varName;
};

/** 
 * Block for variable setter.
 */
const variables_sett = {
  init: function() {
    this.appendValueInput('NAME')
      .appendField('Set')
      .appendField(new Blockly.FieldVariable('VAR_NAME'), 'NAME')
      .appendField('to');
    this.setOutput(true, null);
    this.setTooltip('Set a variable to a value');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(95);
  }
};
Blockly.common.defineBlocks({variables_setting: variables_sett});
pythonGenerator.forBlock['variables_setting'] = function(block, generator) {
  const varName = generator.getVariableName(block.getFieldValue('NAME'));
  const value = generator.valueToCode(block, 'NAME', pythonGenerator.ORDER_ATOMIC);
  return `\n${varName} = ${value}\n`;
}

/**
 * Block for creating a list
 */

Blockly.Blocks['list_create'] = {
  init: function() {
    this.itemCount_ = 0
    this.appendValueInput('element_0')
    .appendField('create list');
    this.setInputsInline(false);
    const appendFieldPlusIcon = new Blockly.FieldImage(
      // eslint-disable-next-line quotes
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-plus' width='60' height='60' viewBox='0 0 24 24' stroke-width='1.5' stroke='%23ffffff' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M12 5l0 14' /%3E%3Cpath d='M5 12l14 0' /%3E%3C/svg%3E",
      16,
      16,
      'Add',
      function (block) {
        block.sourceBlock_.appendArrayElementInput()
      }
    )
    this.appendDummyInput('close').appendField(appendFieldPlusIcon);
    this.setColour(230);
    this.setOutput(true, null);
    this.setTooltip('Create a Python list');
  },

  saveExtraState: function() {
    return {
      itemCount: this.itemCount_,
    }
  },

  loadExtraState: function(state) {
    this.itemCount_ = state['itemCount']
    this.updateShape()
  },

  appendArrayElementInput: function() {
    Blockly.Events.setGroup(true)
    const oldExtraState = getExtraBlockState(this)
    this.itemCount_ += 1
    const newExtraState = getExtraBlockState(this)
    Blockly.Events.fire(new Blockly.Events.BlockChange(this, 'mutation', null, oldExtraState, newExtraState))
    Blockly.Events.setGroup(false)
    this.updateShape()
  },

  deleteArrayElementInput: function(inputToDelete) {
    const oldExtraState = getExtraBlockState(this)
    Blockly.Events.setGroup(true)
    var inputNameToDelete = inputToDelete.name
    var inputIndexToDelete = Number(inputNameToDelete.match(/\d+/)[0])
    var substructure = this.getInputTargetBlock(inputNameToDelete)
    if (substructure) substructure.dispose(true, true)
    this.removeInput(inputNameToDelete)
    this.itemCount_ -= 1
    for (var i = inputIndexToDelete + 1; i <= this.itemCount_; i++) {
      var input = this.getInput('element_' + i)
      input.name = 'element_' + (i - 1)
    }

    const newExtraState = getExtraBlockState(this)
    Blockly.Events.fire(new Blockly.Events.BlockChange(this, 'mutation', null, oldExtraState, newExtraState))
    Blockly.Events.setGroup(false)
  },

  updateShape: function() {
    for (let i = 1; i < this.itemCount_; i++) {
      if (!this.getInput('element_' + i)) {
        const appended_input = this.appendValueInput('element_' + i)

        var deleteArrayElementIcon = new Blockly.FieldImage(
          // eslint-disable-next-line quotes
          `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-minus' width='60' height='60' viewBox='0 0 24 24' stroke-width='1.5' stroke='%23ffffff' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M5 12l14 0' /%3E%3C/svg%3E`,
          16,
          16,
          'Remove',
          function (block) {
            block.sourceBlock_.deleteArrayElementInput(appended_input)
          }
        )
        appended_input.appendField(deleteArrayElementIcon, 'delete_' + i)

        this.moveInputBefore('element_' + i, 'close')
      }
    }
  },
}
pythonGenerator.forBlock['list_create'] = function(block, generator) {
  const elements = [];
  for (let i = 0; i < block.itemCount_; i++) {
    elements.push(generator.valueToCode(block, 'element_' + i, pythonGenerator.ORDER_NONE) || 'None');
  }
  return [`[${elements.join(', ')}]`, pythonGenerator.ORDER_ATOMIC];
};
function getExtraBlockState(block) {
  if (block.saveExtraState) {
    const state = block.saveExtraState()
    return state ? JSON.stringify(state) : ''
  } else if (block.mutationToDom) {
    const state = block.mutationToDom()
    return state ? Blockly.Xml.domToText(state) : ''
  }
  return ''
}

/**
 * Statistical blocks
 */

//**Shape of data */
const Data_shape = {
  init: function() {
    this.appendValueInput('data')
    .setCheck('Array')
      .appendField(new Blockly.FieldLabelSerializable('Data shape'), 'DATA SHAPE');
    this.setInputsInline(true)
    this.setOutput(true, 'tuple');
    this.setTooltip('Find shape of data');
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
    this.setTooltip('Stack the data by rows or columns');
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
      return [`np.hstack((${db1},${db2}))\n`, pythonGenerator.ORDER_COLLECTION];
    case 'ROWS':
      return [`np.vstack((${db1},${db2}))\n`, pythonGenerator.ORDER_COLLECTION];
  }
}

//** create an array*/
const create_array = {
  init: function() {
    this.appendValueInput('array')
    .setCheck(['Number', 'Boolean', 'String', 'List', 'Matrix'])
      .appendField(new Blockly.FieldLabelSerializable('create array of'), 'CREATE');
    this.setOutput(true, 'Array');
    this.setTooltip('Create an array with np.array()');
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
    this.setColour(195);
  }
};
Blockly.common.defineBlocks({delete_object: delete_object});

pythonGenerator.forBlock['delete_object'] = function(block,generator) {
  const value_object = generator.valueToCode(block, 'object', pythonGenerator.ORDER_ATOMIC);
  const value_array = generator.valueToCode(block, 'array', pythonGenerator.ORDER_COLLECTION);
  return [`np.delete(${value_array}, ${value_object})`, pythonGenerator.ORDER_COLLECTION];
}

//**Add in an array */
const add_object = {
  init: function() {
    this.appendValueInput('object')
    .setCheck(['Array', 'Number'])
      .appendField(new Blockly.FieldLabelSerializable('add'), 'ADD');
    this.appendValueInput('array')
    .setCheck('Array')
      .appendField(new Blockly.FieldLabelSerializable('in'), 'IN');
    this.setInputsInline(true);
    this.setOutput(true, 'Array');
    this.setTooltip('Add an object in an array');
    this.setHelpUrl('');
    this.setColour(200);
  }
};
Blockly.common.defineBlocks({add_object: add_object});

pythonGenerator.forBlock['add_object'] = function(block,generator) {
  const value_object = generator.valueToCode(block, 'object', pythonGenerator.ORDER_ATOMIC);
  const value_array = generator.valueToCode(block, 'array', pythonGenerator.ORDER_COLLECTION);
  return [`np.append(${value_array}, ${value_object})`, pythonGenerator.ORDER_COLLECTION];
}

/**
 * Nunmpy: filter list
 */
const list_filter = {
  init: function() {
    this.appendValueInput('CNAME')
      .appendField('array to filter')
      .appendField(new Blockly.FieldTextInput('LIST_NAME'), 'CNAME');
    this.appendValueInput('DNAME')
      .appendField('according to')
      .appendField(new Blockly.FieldTextInput('LIST_NAME2'), 'DNAME');
    this.appendDummyInput('ENAME')
      .appendField('store array in')
      .appendField(new Blockly.FieldTextInput('VAR_NAME'), 'ENAME');
    this.setInputsInline(false)
    this.setOutput(true, null);
    this.setTooltip('Filter a list according to a list of booleans');
    this.setHelpUrl('');
    this.setColour(315);
  }
};
Blockly.common.defineBlocks({list_filter: list_filter});
pythonGenerator.forBlock['list_filter'] = function(block, generator) {
  const text_cname = block.getFieldValue('CNAME');
  const text_dname = block.getFieldValue('DNAME');
  const text_ename = block.getFieldValue('ENAME');
  const value_cname = generator.valueToCode(block, 'CNAME', pythonGenerator.ORDER_ATOMIC);
  const value_dname = generator.valueToCode(block, 'DNAME', pythonGenerator.ORDER_ATOMIC);
  return [`${text_cname} = np.array(${value_cname})\n${text_dname} = ${value_dname}\n${text_ename} = ${text_cname}[${text_dname}]\n`, pythonGenerator.ORDER_ATOMIC];
}

/**
 * Value to boolean
 */
const to_bool = {
  init: function() {
    this.appendValueInput('NAME')
      .appendField('convert to boolean');
    this.setInputsInline(true)
    this.setOutput(true, 'Boolean');
    this.setTooltip('Transform a value into a boolean');
    this.setHelpUrl('');
    this.setColour(95);
  }
};
Blockly.common.defineBlocks({to_bool: to_bool});
pythonGenerator.forBlock['to_bool'] = function(block, generator) {
  const value_name = generator.valueToCode(block, 'NAME', pythonGenerator.ORDER_ATOMIC);
  return [`bool(${value_name})`, pythonGenerator.ORDER_ATOMIC];
}

/**
 * Line-break
 */

const lineBreak = {
  init: function() {
    this.appendDummyInput('')
        .appendField('Line-break');
    this.setTooltip('Enter a line-break in code');
    this.setNextStatement(true, null);
    this.setPreviousStatement(true, null);
    this.setColour('#888');
  }
};
Blockly.common.defineBlocks({line_break: lineBreak});
pythonGenerator.forBlock['line_break'] = function() {
  return '\n'
}

/**
 * Sort a list
 */

const sort = {
  init: function() {
    this.appendValueInput('CNAME')
      .appendField('list to sort');
    this.setInputsInline(true)
    this.setOutput(true, null);
    this.setTooltip('Sort an array (one- or multidimensionl)');
    this.setHelpUrl('');
    this.setColour(95);
  }
};
Blockly.common.defineBlocks({sort: sort});
pythonGenerator.forBlock['sort'] = function(block, generator) {
  const value_name = generator.valueToCode(block, 'CNAME', pythonGenerator.ORDER_ATOMIC);
  return `np.sort(np.array(${value_name}))`;
}

/**
 * Input block
 */

const input = {
  init: function() {
    this.appendDummyInput()
        .appendField('input')
        .appendField(new Blockly.FieldTextInput('question', (txt) => { 
          return txt
        }), 'CSV');
    this.setTooltip('Make user input a value');
    this.appendEndRowInput();
    this.setColour(95);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};
Blockly.common.defineBlocks({input: input});
pythonGenerator.forBlock['input'] = function(block, generator) {
  const question = block.getFieldValue('CSV') || '0';
  return `input('${question}')\n`;
}

  // init: function(){
  //   this.appendDummyInput()
  //   .appendField('Load data from CSV:')
  //   .appendField(new Blockly.FieldTextInput('iris.csv', (txt) => {
  //     return txt
  //   }), 'CSV');
//     this.setTooltip('Loads a given CSV dataset');
//     this.appendEndRowInput();
//     this.setColour(200);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//   },
// };
// pythonGenerator.forBlock['load_csv'] = function(block, generator) {
//   const dataset = block.getFieldValue('CSV') || '0';
//   return `pd.read_csv('${dataset}')\n`;
// };