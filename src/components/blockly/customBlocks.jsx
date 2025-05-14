import * as Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

/**
 * Value Input Block (returns value)
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
  return [`(${num} ** 2)`, pythonGenerator.ORDER_EXPONENTIATION];
};

/**
 * Statement Input Block (loop)
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
 * Length of str (returns int)
 */
Blockly.Blocks["length_of_str"] = {
  init: function(){
    this.appendValueInput('STR')
    .appendField('length of')
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
    this.setTooltip('Module: returns the remainder of a division');
    this.setColour(230);
  }
};
Blockly.common.defineBlocks({modulo: modulo});
pythonGenerator.forBlock['modulo'] = function(block) {
  const number_a = block.getFieldValue('a');
  const number_b = block.getFieldValue('b');
  return [`(${number_a} % ${number_b})`, pythonGenerator.ORDER_MULTIPLICATIVE];
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

/** Mathematical constants */
Blockly.Blocks['consts'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ['e', 'e'],
          ['π', 'pi'],
          ['∞', 'inf'],
          ['γ', 'euler_gamma'],
          ['NaN', 'nan']
        ]), 'NUM');
    this.setOutput(true, "Number");
    this.setTooltip('A block to be able to use several mathematical constants');
    this.setColour(230);
  }
}
pythonGenerator.forBlock['consts'] = function(block,generator) {
  const dropdown_name = block.getFieldValue('NUM');
  return [`np.${dropdown_name}`, pythonGenerator.ORDER_ATOMIC];
}

/************************
 * 
 * LOADING BLOCKS
 * 
 ************************/
/**
 * Load csv file
 */
Blockly.Blocks['load_csv'] = {
  init: function(){
    this.appendDummyInput()
        .appendField('Load data from CSV:')
        .appendField(new Blockly.FieldTextInput('iris'), 'CSV')
        .appendField('.csv');
    this.setTooltip('Loads a given CSV dataset');
    this.appendEndRowInput();
    this.setOutput(true, 'Array');
    this.setColour(200);
  },
};
pythonGenerator.forBlock['load_csv'] = function(block, generator) {
  const dataset = block.getFieldValue('CSV') || '0';
  return [`pd.read_csv('${dataset}.csv')`, pythonGenerator.ORDER_ATOMIC];
};

/**
 * Load file from URL
 */
Blockly.Blocks['load_csv_from_url'] = {
  init: function(){
    this.appendDummyInput()
    .appendField('Load CSV file from URL')
    .appendField(new Blockly.FieldTextInput('http://example.com/iris.csv', (url) => url.match(/^[a-z]{4,5}:\/\/[A-Za-zÀ-ÖØ-öø-ÿ0-9.\/:_-]*?\.[a-z]{2,6}/) ? url : 'ERROR!'), 'CSV');
    this.setTooltip('Loads a given CSV dataset from an URL. Local files can be used by prepending "file://".');
    this.appendEndRowInput();
    this.setOutput(true, 'Array');
    this.setColour(200);

  },
};
pythonGenerator.forBlock['load_csv_from_url'] = function(block, generator) {
  const dataset = block.getFieldValue('CSV') || '0';
  return [`pd.read_csv('${dataset}')\n`, pythonGenerator.ORDER_ATOMIC];
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
    this.setTooltip("Returns the logarithm of a number");
  },
};
pythonGenerator.forBlock["log_of"] = function (block, generator) {
  const num =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return [`np.log(${num})`, pythonGenerator.ORDER_ATOMIC];
};

Blockly.Blocks['trigo'] = {
  init: function() {
    this.appendValueInput("NUM")
        .setCheck("Number")
        .appendField(new Blockly.FieldDropdown([
          ['sin', 'sin'],
          ['cos', 'cos'],
          ['tan', 'tan'],
          ['arcsin', 'arcsin'],
          ['arccos', 'arccos'],
          ['arctan', 'arctan'],
          ['sinh', 'sinh'],
          ['cosh', 'cosh'],
          ['tanh', 'tanh'],
          ['arcsinh', 'arcsinh'],
          ['arccosh', 'arccosh'],
          ['arctanh', 'arctanh']
        ]), 'TRIGO');
    this.setOutput(true, "Number");
    this.setColour(230);
    this.setTooltip("Returns the sine, cosine, tangent, etc. of a number");
  }
}
pythonGenerator.forBlock['trigo'] = function (block, generator) {
  const num = generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  const trigFunc = block.getFieldValue('TRIGO');
  return [`np.${trigFunc}(${num})`, pythonGenerator.ORDER_ATOMIC];
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
  return [`np.round(${num})`, pythonGenerator.ORDER_ATOMIC];
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
  return ['True', pythonGenerator.ORDER_ATOMIC];
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
  return ['False', pythonGenerator.ORDER_ATOMIC];
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
    this.setTooltip("Returns the median of an array of numbers");
  },
};
pythonGenerator.forBlock["median"] = function(block, generator) {
  const median =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return [`np.median(${median})`, pythonGenerator.ORDER_ATOMIC];
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
    this.setTooltip("Returns the sum of an array of numbers");
  },
};
pythonGenerator.forBlock["sum"] = function(block, generator) {
  const sum =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return [`np.sum(${sum})`, pythonGenerator.ORDER_ATOMIC];
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
    this.setTooltip("Returns the standard deviation of an array of numbers");
  },
};
pythonGenerator.forBlock["std"] = function(block, generator) {
  const std =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return [`np.std(${std})`, pythonGenerator.ORDER_ATOMIC];
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
    this.setTooltip("Returns the mean squared error of an array of numbers");
  },
};
pythonGenerator.forBlock["mean_squared"] = function(block, generator) {
  const msq =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return [`(quad_err = 0\nfor i in range(${msq}.shape[0]) :\n  quad_err += (${msq}[i,0] - np.mean(${msq}))**2\n
quad_err /= ${msq}.shape[0])\n`, pythonGenerator.ORDER_ATOMIC];
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

/** 
 * Minimum of array of numbers
 */
const min = { 
  init: function() {
    this.appendValueInput('minimum')
    .setCheck('Array')
      .appendField(new Blockly.FieldLabelSerializable('Minimum of'), 'MINIMUM');
    this.setOutput(true, 'Number');
    this.setTooltip('Returns the minimum of an array of numbers');
    this.setColour(150);
  }
};
Blockly.common.defineBlocks({min: min});
pythonGenerator.forBlock["min"] = function(block, generator) {
  const mini =
    generator.valueToCode(block, "minimum", pythonGenerator.ORDER_NONE) || "0";
  return [`np.min(${mini})`, pythonGenerator.ORDER_ATOMIC];
};
                
/* Slice iterable */
Blockly.Blocks['slice'] = {
  init: function() {
    this.appendDummyInput('NAME')
        .appendField('slice variable')
        .appendField(new Blockly.FieldVariable("VAR_NAME"), "VAR")
        .appendField('to values')
        .appendField(new Blockly.FieldNumber("0"), "VAL1")
        .appendField(':')
        .appendField(new Blockly.FieldNumber("0"), "VAL2");
    this.setOutput(true);
    this.setTooltip('Slice a variable according to given indexes.')
    this.setColour(200);
  }
};
pythonGenerator.forBlock['slice'] = function(block, generator) {
  const Val1 = block.getFieldValue('VAL1');
  const Val2 = block.getFieldValue('VAL2');
  const varID = block.getFieldValue('VAR') || '0';
  const getVar = block.workspace.getVariableById(varID);
  const Var = getVar ? getVar.name : 'undefined';
  return `${Var} = ${Var}[${Val1}:${Val2}]`
};

/* Slice file */
Blockly.Blocks['slice_file'] = {
  init: function() {
    this.appendDummyInput('NAME')
        .appendField('slice file')
        .appendField(new Blockly.FieldVariable("VAR_NAME"), "VAR");
    this.appendValueInput('CNAME')
        .appendField('to condition');
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('Slice a file according to a given condition.')
    this.setColour(200);
  }
};
pythonGenerator.forBlock['slice_file'] = function(block, generator) {
  const varID = block.getFieldValue('VAR') || '0';
  const getVar = block.workspace.getVariableById(varID);
  const Var = getVar ? getVar.name : 'undefined';
  const cond = generator.valueToCode(block, 'CNAME', pythonGenerator.ORDER_ATOMIC);
  return [`${Var}[${cond}]\n`, pythonGenerator.ORDER_ATOMIC]
};

Blockly.Blocks['list_access'] = {
  init: function() {
    this.appendDummyInput('NAME')
        .appendField(new Blockly.FieldVariable("VAR_NAME"), "LIST")
        .appendField('[');
    this.appendValueInput('CNAME');
    this.appendEndRowInput()
        .appendField(']');
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('Access an element in a given list');
    this.setColour(200);
  }
};
pythonGenerator.forBlock['list_access'] = function(block, generator) {
  const varName = block.getFieldValue('LIST') || '0';
  const getVar = block.workspace.getVariableById(varName);
  const listName = getVar ? getVar.name : 'undefined';
  const elem = generator.valueToCode(block, 'CNAME', pythonGenerator.ORDER_ATOMIC);
  return [`${listName}[${elem}]`, pythonGenerator.ORDER_ATOMIC]
};

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
const data_shape = {
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
Blockly.common.defineBlocks({data_shape: data_shape});
pythonGenerator.forBlock['data_shape'] = function(block,generator) {
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
      return [`np.hstack((${db1}, ${db2}))\n`, pythonGenerator.ORDER_COLLECTION];
    case 'ROWS':
      return [`np.vstack((${db1}, ${db2}))\n`, pythonGenerator.ORDER_COLLECTION];
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
  return [`np.sort(np.array(${value_name}))`, pythonGenerator.ORDER_ATOMIC];
}

/**
 * Input block
 */

const input = {
  init: function() {
    this.appendDummyInput('CNAME')
        .appendField('input')
        .appendField(new Blockly.FieldTextInput('question', (txt) => { 
          return txt
        }), 'CSV');
    this.setTooltip('Make user input a value');
    this.setOutput(true, null);
    this.appendEndRowInput();
    this.setColour(95);
  }
};
Blockly.common.defineBlocks({input: input});
pythonGenerator.forBlock['input'] = function(block, generator) {
  const question = block.getFieldValue('CSV') || '0';
  return [`input('${question}')\n`, pythonGenerator.ORDER_ATOMIC];
}

/** Lambda func block */
const lambda = {
  init: function() {
    this.appendValueInput('EXPR')
        .appendField('lambda')
        .appendField(new Blockly.FieldTextInput('x', (txt) => txt.match(/^[A-Za-z_][A-Za-z0-9_]*$/) ? txt : 'ERROR!'), 'LAMBDA')
        .appendField(':');
    this.setTooltip('Python lambda function (used for plotting for example). You can use multiple arguments by separating them with a comma.');
    this.setColour(120);
    this.setHelpUrl('https://www.w3schools.com/python/python_lambda.asp');
    this.setOutput(true);
  }
}
Blockly.common.defineBlocks({lambda: lambda});
pythonGenerator.forBlock['lambda'] = function(block, generator) {
  const VAR = block.getFieldValue('LAMBDA') || '0';
  const EXPR = generator.valueToCode(block, 'EXPR', pythonGenerator.ORDER_NONE)
  return [`lambda ${VAR}: (${EXPR})\n`, pythonGenerator.ORDER_ATOMIC]; //ORDER_LAMBDA does a strange parentheses game, whereas ORDER_ATOMIC always works, although without parentheses.
}

/**
 * Temporary variables
 * 
 * As these could represent a dangerous security
 * threat when compiling, they are limited to
 * one character so as to protect the compiler
 * from malware.
 */
Blockly.Blocks['temp_var'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput('VAR_NAME', (txt) => txt.slice(0, 1)), 'var');
    this.setOutput(true);
    this.setColour(15);
  }
};
pythonGenerator.forBlock['temp_var'] = function(block, generator) {
  const varName = block.getFieldValue('var') || '0';
  return [varName, pythonGenerator.ORDER_ATOMIC];
};

/** Import blocks */
const import0 = {
  init: function() {
    this.appendDummyInput()
        .appendField('import')
        .appendField(new Blockly.FieldTextInput('module'), 'IMPORT');
    this.setTooltip('Import module to code');
    this.setColour('#888');
    this.setPreviousStatement(true);
    this.setNextStatement(true, null);
  }
};
Blockly.common.defineBlocks({import0: import0});
pythonGenerator.forBlock['import0'] = function(block, generator) {
  const module = block.getFieldValue('IMPORT') || '0';
  return `import ${module}\n`;
}

const import1 = {
  init: function() {
    this.appendDummyInput('CNAME')
        .appendField('import')
        .appendField(new Blockly.FieldTextInput('module'), 'IMPORT')
        .appendField('as')
        .appendField(new Blockly.FieldTextInput('alias'), 'ALIAS')
    this.setTooltip('Import library to code, with alias');
    this.setColour('#888');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.common.defineBlocks({import1: import1});
pythonGenerator.forBlock['import1'] = function(block, generator) {
  const module = block.getFieldValue('IMPORT') || '0';
  const alias = block.getFieldValue('ALIAS') || '0';
  return `import ${module} as ${alias}\n`;
}

const import2 = {
  init: function() {
    this.appendDummyInput('CNAME')
        .appendField('from')
        .appendField(new Blockly.FieldTextInput('module'), 'IMPORT')
        .appendField('import')
        .appendField(new Blockly.FieldTextInput('function'), 'FUNCTION');
    this.setTooltip('Import functions from library to code. You can also use \'*\' and specify more functions separating them with commas.');
    this.setColour('#888');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.common.defineBlocks({import2: import2});
pythonGenerator.forBlock['import2'] = function(block, generator) {
  const module = block.getFieldValue('IMPORT') || '0';
  const func = block.getFieldValue('FUNCTION') || '0';
  return `from ${module} import ${func}\n`;
}

const import3 = {
  init: function() {
    this.appendDummyInput('CNAME')
        .appendField('from')
        .appendField(new Blockly.FieldTextInput('module'), 'IMPORT')
        .appendField('import')
        .appendField(new Blockly.FieldTextInput('function'), 'FUNCTION')
        .appendField('as')
        .appendField(new Blockly.FieldTextInput('alias'), 'ALIAS');
    this.setTooltip('Import library to code.');
    this.setColour('#888');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.common.defineBlocks({import3: import3});
pythonGenerator.forBlock['import3'] = function(block, generator) {
  const module = block.getFieldValue('IMPORT') || '0';
  const func = block.getFieldValue('FUNCTION') || '0';
  const alias = block.getFieldValue('ALIAS') || '0';
  return `from ${module} import ${func} as ${alias}\n`;
}

/*****************
 * DATA VIZ BLOCKS
 *****************/

Blockly.Blocks['create_data_and_output'] = {
  init: function() {
    this.appendDummyInput('')
        .appendField('Create data and output folders');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(200);
    this.setTooltip('Create data and output folders for data visualisation');
  }
};
pythonGenerator.forBlock['create_data_and_output'] = function() {
  return '' + 
  'import os\n\n' +
    'data_folder = "data"\n' +
    'output_folder = "output"\n\n' +
    'if not os.path.exists(data_folder):\n' +
        '\tos.mkdir(data_folder)\n' +
    'if not os.path.exists(output_folder):\n' +
        '\tos.mkdir(output_folder)\n'
};

const def_download = {
  init: function() {
    this.appendDummyInput()
        .appendField('Definition: download (from URL)');
    this.setTooltip('Define function to download file from URL into previously created \'data\' file.');
    this.setNextStatement(true);
    this.setPreviousStatement(true);
    this.setColour('#888');
  }
};
Blockly.common.defineBlocks({def_download: def_download});
pythonGenerator.forBlock['def_download'] = function() {
  return '' +
  'import requests\n' +
  'def download(url):\n' +
  '\tfilename = os.path.join(data_folder, os.path.basename(url))\n' +
  '\tif not os.path.exists(filename):\n' + 
    '\t\twith requests.get(url, stream=True, allow_redirects=True) as r:\n' +
        '\t\t\twith open(filename, "wb") as f:\n' + 
            '\t\t\t\tfor chunk in r.iter_content(chunk_size=8192):\n' +
                '\t\t\t\t\tf.write(chunk)\n' + 
    '\t\tprint("Downloaded ", filename)\n\n'
}

Blockly.Blocks['func_download'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Download (from URL)')
        .appendField(new Blockly.FieldTextInput('http://file.zip'), 'NAME');
    this.setTooltip('Use function to download file from URL into previously created \'data\' file.');
    this.setNextStatement(true);
    this.setPreviousStatement(true);
    this.setColour(200);
  }
};
pythonGenerator.forBlock['func_download'] = function(block, generator) {
  const url = block.getFieldValue('NAME');
  return `download('${url}')\n`
}

Blockly.Blocks['read_file'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('read file')
        .appendField(new Blockly.FieldTextInput('file.zip'), 'NAME');
    this.setTooltip('Use function to read file from URL from previously created \'data\' file.');
    this.setNextStatement(true);
    this.setPreviousStatement(true);
    this.setColour(200);
  }
};
pythonGenerator.forBlock['read_file'] = function(block, generator) {
  const fileName = block.getFieldValue('NAME');
  return `gpd.read_file(os.path.join(data_folder, ${fileName}))\n`
}

Blockly.Blocks['write_file'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Create GeoPackage')
        .appendField(new Blockly.FieldTextInput('file_name'), 'NAME')
        .appendField('.gpkg');
    this.setTooltip('Write to previously created output folder. The format of this file is GeoPackage (.gpkg).')
    this.setNextStatement(true);
    this.setPreviousStatement(true);
    this.setColour(200);
  }
}
pythonGenerator.forBlock['write_file'] = function(block, generator) {
  const fileName = block.getFieldValue('NAME');
  return '\n' + 
  `output_file = "${fileName}"\n` + 
  'output_path = os.path.join(output_folder, output_file)\n' + 
  'capitals.to_file(driver="GPKG", filename=output_path)\n'
}

/** Show data **/
Blockly.Blocks['plot'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Plot line');
    this.appendValueInput('valX')
        .appendField('X-value');
    this.appendValueInput('valY')
        .appendField('Y-value');
    this.appendDummyInput('fmt')
        .appendField('format')
        .appendField(new Blockly.FieldTextInput('^k:'), 'FMT')
    this.appendValueInput('title')
        .appendField('Title');
    this.appendDummyInput('size')
        .appendField('Size:')
        .appendField('X')
        .appendField(new Blockly.FieldNumber(''), 'XVAL')
        .appendField('Y')
        .appendField(new Blockly.FieldNumber(''), 'YVAL');
    this.appendValueInput('XLabel')
        .appendField('X-axis label');
    this.appendValueInput('YLabel')
        .appendField('Y-axis label');
    this.appendValueInput('Legend')
        .appendField('Legend');
    this.appendDummyInput('GRID')
        .appendField('Grid?')
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'Grid');
    this.setInputsInline(false);
    this.setTooltip('Plot a line with X and Y data');
    this.setHelpUrl('https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.plot.html#matplotlib.pyplot.plot');
    this.setColour(325);
  }
}
pythonGenerator.forBlock['plot'] = function(block, generator) {
  const dataX = generator.valueToCode(block, 'valX', pythonGenerator.ORDER_NONE) || "0";
  const dataY = generator.valueToCode(block, 'valY', pythonGenerator.ORDER_NONE) || "0";
  const format = block.getFieldValue('FMT');
  const title = block.getFieldValue('TTL');
  const size = [block.getFieldValue('XVAL'), block.getFieldValue('YVAL')];
  const labels = [generator.valueToCode(block, 'XLabel', pythonGenerator.ORDER_NONE) || "0", generator.valueToCode(block, 'YLabel', pythonGenerator.ORDER_NONE) || "0"];
  const legend = generator.valueToCode(block, 'LEG', pythonGenerator.ORDER_NONE) || "0";
  let grid = block.getFieldValue('Grid').toLowerCase();
  grid = grid[0].toUpperCase() + grid.slice(1);
  return '' +
  `x = ${dataX}\n` +
  `y = ${dataY}\n` +
  `plt.figure(figsize = (${size[0]}, ${size[1]}))\n` + 
  `plt.plot(x, y, '${format}')\n` + 
  `plt.title(${title})\n` +
  `plt.xlabel(${labels[0]})\n` + 
  `plt.ylabel(${labels[1]})\n` +
  `plt.grid(${grid})\n` +
  `plt.legend(${legend})\n` +
  `plt.show()\n`
}

/** Show scattered data */
Blockly.Blocks['scatter'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Plot scatter graph');
    this.appendValueInput('valX')
        .appendField('X-value');
    this.appendValueInput('valY')
        .appendField('Y-value');
    this.appendValueInput('title')
        .appendField('Title');
    this.appendDummyInput('size')
        .appendField('Size:')
        .appendField('X')
        .appendField(new Blockly.FieldNumber(''), 'XVAL')
        .appendField('Y')
        .appendField(new Blockly.FieldNumber(''), 'YVAL');
    this.appendValueInput('XLabel')
        .appendField('X-axis label');
    this.appendValueInput('YLabel')
        .appendField('Y-axis label');
    this.appendValueInput('Legend')
        .appendField('Legend');
    this.appendDummyInput('GRID')
        .appendField('Grid?')
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'Grid');
    this.setInputsInline(false);
    this.setHelpUrl('https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.scatter.html#matplotlib.axes.Axes.scatter');
    this.setTooltip('Plot a graph with X and Y data');
    this.setColour(325);
  }
}
pythonGenerator.forBlock['scatter'] = function(block, generator) {
  const dataX = generator.valueToCode(block, 'valX', pythonGenerator.ORDER_NONE) || "0";
  const dataY = generator.valueToCode(block, 'valY', pythonGenerator.ORDER_NONE) || "0";
  const title = generator.valueToCode(block, 'TTL', pythonGenerator.ORDER_NONE) || "0";
  const size = [block.getFieldValue('XVAL'), block.getFieldValue('YVAL')];
  const labels = [generator.valueToCode(block, 'XLabel', pythonGenerator.ORDER_NONE) || "0", generator.valueToCode(block, 'YLabel', pythonGenerator.ORDER_NONE) || "0"];
  const legend = generator.valueToCode(block, 'LEG', pythonGenerator.ORDER_NONE) || "0";
  let grid = block.getFieldValue('Grid').toLowerCase();
  grid = grid[0].toUpperCase() + grid.slice(1);
  return '' +
  `x = ${dataX}\n` +
  `y = ${dataY}\n` +
  `plt.figure(figsize = (${size[0]}, ${size[1]}))\n` + 
  `plt.scatter(x, y)\n` + 
  `plt.title(${title})\n` +
  `plt.xlabel(${labels[0]})\n` + 
  `plt.ylabel(${labels[1]})\n` +
  `plt.grid(${grid})\n` +
  `plt.legend(${legend})\n` +
  `plt.show()\n`
}

//**reshape an array */
const reshape = {
  init: function() {
    this.appendValueInput('NAME')
    .setCheck('Array')
      .appendField(new Blockly.FieldLabelSerializable('reshape array:'), 'DATA');
    this.appendValueInput('rows')
    .setCheck('Number')
      .appendField(new Blockly.FieldLabelSerializable('new size:'), 'SIZE');
    this.appendValueInput('columns')
    .setCheck('Number');
    this.setInputsInline(true)
    this.setOutput(true, null);
    this.setTooltip('Reshape an array');
    this.setHelpUrl('https://www.w3schools.com/python/numpy/numpy_array_reshape.asp');
    this.setColour(200);
  }
};
Blockly.common.defineBlocks({reshape: reshape});    
pythonGenerator.forBlock['reshape'] = function(block,generator) {
  const value_array = generator.valueToCode(block, 'NAME', pythonGenerator.ORDER_COLLECTION);
  const value_rows = generator.valueToCode(block, 'rows', pythonGenerator.ORDER_ATOMIC);
  const value_columns = generator.valueToCode(block, 'columns', pythonGenerator.ORDER_ATOMIC);
  return [`np.reshape(${value_array}, (${value_rows},${value_columns}))`, pythonGenerator.ORDER_ATOMIC];
}

//**load from txt */
Blockly.Blocks['load_txt'] = {
  init: function(){
    this.appendDummyInput()
        .appendField('Load data from txt:')
        .appendField(new Blockly.FieldTextInput(''), 'txt')
        .appendField('.txt');
    this.setTooltip('Loads a given txt dataset');
    this.appendEndRowInput();
    this.setOutput(true, 'Array');
    this.setColour(200);
  },
};
pythonGenerator.forBlock['load_txt'] = function(block, generator) {
  const dataset = block.getFieldValue('txt') || '0';
  return [`np.loadtxt('${dataset}.txt')`, pythonGenerator.ORDER_ATOMIC];
};

//**load from a json file */
Blockly.Blocks['load_json'] = {
  init: function(){
    this.appendDummyInput()
        .appendField('Load data from json:')
        .appendField(new Blockly.FieldTextInput(''), 'json')
        .appendField('.json');
    this.setTooltip('Loads a given json file');
    this.appendEndRowInput();
    this.setOutput(true, 'Array');
    this.setColour(200);
  },
};
pythonGenerator.forBlock['load_json'] = function(block, generator) {
  const dataset = block.getFieldValue('json') || '0';
  return [`pd.read_json('${dataset}.json')`, pythonGenerator.ORDER_ATOMIC];
};

Blockly.Blocks['arange'] = {
  init: function(){
    this.appendValueInput('start')
        .appendField('Generate values between');
    this.appendValueInput('stop')
        .appendField('and')
    this.appendValueInput('step')
        .appendField('with step');
    this.setTooltip('Generate a range of values between two numbers');
    this.setInputsInline(false);
    this.setOutput(true, 'Array');
    this.setColour(200);
  },
};
pythonGenerator.forBlock['arange'] = function(block, generator) {
  const start = generator.valueToCode(block, 'start', pythonGenerator.ORDER_ATOMIC);
  const stop = generator.valueToCode(block, 'stop', pythonGenerator.ORDER_ATOMIC);
  const step = generator.valueToCode(block, 'step', pythonGenerator.ORDER_ATOMIC);
  return [`np.arange(${start}, ${stop}, ${step})`, pythonGenerator.ORDER_ATOMIC];
};

//**indices in array */

/** 
 * Minimum indices of array of numbers
 */
const ind_min = { 
  init: function() {
    this.appendValueInput('minimum')
        .setCheck('Array')
        .appendField(new Blockly.FieldLabelSerializable('Indice of minimum of'), "IND_MINIMUM");
    this.setOutput(true, 'Number');
    this.setTooltip('Returns the indice of the minimum of an array of numbers');
    this.setColour(150);
    this.setHelpUrl('https://numpy.org/doc/2.1/reference/generated/numpy.argmin.html');
  }
};
Blockly.common.defineBlocks({ind_min: ind_min});
pythonGenerator.forBlock["ind_min"] = function(block, generator) {
  const ind_mini =
    generator.valueToCode(block, "minimum", pythonGenerator.ORDER_NONE) || "0";
  return [`np.argmin(${ind_mini})`, pythonGenerator.ORDER_ATOMIC];
};

/** 
 * Maximum indices of array of numbers
 */
const ind_max = { 
  init: function() {
    this.appendValueInput('maximum')
        .setCheck('Array')
        .appendField(new Blockly.FieldLabelSerializable('Indice of maximum of'), 'IND_MAXIMUM');
    this.setOutput(true, 'Number');
    this.setTooltip('Returns the indice of the maximum of an array of numbers');
    this.setHelpUrl('https://numpy.org/doc/stable/reference/generated/numpy.argmax.html');
    this.setColour(150);
  }
};
Blockly.common.defineBlocks({ind_max: ind_max});
pythonGenerator.forBlock["ind_max"] = function(block, generator) {
  const ind_maxi =
    generator.valueToCode(block, "maximum", pythonGenerator.ORDER_NONE) || "0";
  return [`np.argmax(${ind_maxi})`, pythonGenerator.ORDER_ATOMIC];
};

/** 
 * Sorting indices of array of numbers
 */
const ind_sort = { 
  init: function() {
    this.appendValueInput('sort')
        .setCheck('Array')
        .appendField(new Blockly.FieldLabelSerializable('Sorted array of indices of'), 'IND_SORT');
    this.setOutput(true, 'Array');
    this.setTooltip('Returns an array of indices of an array of numbers according to their values');
    this.setHelpUrl('https://numpy.org/doc/stable/reference/generated/numpy.argsort.html');
    this.setColour(150);
  }
};
Blockly.common.defineBlocks({ind_sort: ind_sort});
pythonGenerator.forBlock["ind_sort"] = function(block, generator) {
  const ind_sort =
    generator.valueToCode(block, "sort", pythonGenerator.ORDER_NONE) || "0";
  return [`np.argsort(${ind_sort})`, pythonGenerator.ORDER_COLLECTION];
};

/** 
 * Finding the indice of array of numbers
 */
const ind_find = { 
  init: function() {
    this.appendValueInput('find')
        .setCheck('Boolean')
        .appendField(new Blockly.FieldLabelSerializable('Find indices'), 'IND_FIND');
    this.setOutput(true, 'Array');
    this.setTooltip('Returns the found indices of an array of numbers, given a condition');
    this.setHelpUrl('https://numpy.org/doc/stable/reference/generated/numpy.argwhere.html');
    this.setColour(150);
  }
};
Blockly.common.defineBlocks({ind_find: ind_find});
pythonGenerator.forBlock["ind_find"] = function(block, generator) {
  const ind_find =
    generator.valueToCode(block, "find", pythonGenerator.ORDER_NONE) || "0";
  return [`np.argwhere(${ind_find})`, pythonGenerator.ORDER_COLLECTION];
};

//**GEOMETRY BLOCKS*/
const buffer = {
  init: function() {
    this.appendDummyInput('center')
        .appendField(new Blockly.FieldLabelSerializable('Buffer: centre'), 'CENTER')
        .appendField(new Blockly.FieldNumber(0), 'x')
        .appendField(',')
        .appendField(new Blockly.FieldNumber(0), 'y');
    this.appendDummyInput('radius')
        .appendField(new Blockly.FieldLabelSerializable('Radius'), 'RADIUS')
        .appendField(new Blockly.FieldNumber(0), 'r');
    this.appendDummyInput()
        .appendField('Show cercle?')
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'SHOW');
    this.appendDummyInput()
        .appendField('Circle variable name')
        .appendField(new Blockly.FieldTextInput('circle'), 'name');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Create a buffer with its center and its radius');
    this.setColour(60);
  }
};
Blockly.common.defineBlocks({buffer: buffer});
pythonGenerator.forBlock['buffer'] = function(block, generator) {
  const number_x = block.getFieldValue('x') || '0';
  const number_y = block.getFieldValue('y') || '0';
  const number_rad = block.getFieldValue('r') || '0';
  const varName = block.getFieldValue('name') || '0';
  let show0 = block.getFieldValue('SHOW');
  show0 = (show0.toLowerCase() === 'true') ? `\n${varName}\n` : '\n'
  return `from shapely.geometry import Point\n`+
  `point_from_buffer = Point(${number_x}, ${number_y})\n`+
  `${varName} = point.buffer(${number_rad})`+
  `${show0}`
}

const create_point = { 
  init: function() {
    this.appendDummyInput('point')
        .appendField('Create point with coordinates')
        .appendField(new Blockly.FieldNumber('1'), 'XCoord')
        .appendField(',')
        .appendField(new Blockly.FieldNumber('1'), 'YCoord');
    this.appendDummyInput()
        .appendField('Show point?')
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'SHOW');
    this.appendDummyInput()
        .appendField('Point variable name')
        .appendField(new Blockly.FieldTextInput('point'), 'name');
    this.setNextStatement(true);
    this.setPreviousStatement(true);
    this.setTooltip('Returns a Point() object with given coordinates');
    this.setColour(150);
  }
};
Blockly.common.defineBlocks({create_point: create_point});
pythonGenerator.forBlock["create_point"] = function(block, generator) {
  const X_Coord = block.getFieldValue('XCoord') || '0';
  const Y_Coord = block.getFieldValue('YCoord') || '0';
  const varName = block.getFieldValue('name') || '0';
  let show1 = block.getFieldValue('SHOW');
  show1 = (show1.toLowerCase() === 'true') ? `\n${varName}\n` : '\n'
  return '' + 
  'from shapely.geometry import Point\n' +
  `${varName} = Point(${X_Coord}, ${Y_Coord})` + 
  `${show1}`;
};