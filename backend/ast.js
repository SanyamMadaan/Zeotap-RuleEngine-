class Node {
  constructor(type, value = null, left = null, right = null) {
    this.type = type;
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

// Create AST from a rule string
function createAST(ruleString) {
  const cleanedRule = ruleString.replace(/[()]/g, '').trim(); // Remove extra parentheses
  const parts = cleanedRule.split(/\s+(AND|OR)\s+/); // Split by AND/OR

  // Recursive function to build AST from rule parts
  function buildAST(parts) {
    if (parts.length === 1) {
      return { type: 'operand', value: parts[0].trim() };
    }

    const operator = parts[1]; // AND or OR
    const left = parts[0].trim();
    const right = parts.slice(2).join(' ').trim();

    return {
      type: 'operator',
      value: operator,
      left: buildAST([left]),
      right: buildAST([right])
    };
  }

  return buildAST(parts);
}
// Evaluate AST with user data
function evaluateAST(node, data) {
  if(!node){
    throw new Error('Invalid AST node');
  }
  
  if (node.type === 'operand') {
    const [field, operator, value] = node.value.split(' ');

    if(!(field in data)){
      console.warn(`Field "${field}" not found in data. Returning false.`);
      return false;
    }
    switch (operator) {
      case '>':
        return data[field] > parseInt(value);
      case '<':
        return data[field] < parseInt(value);
      case '=':
        return data[field] === value.replace(/'/g, ''); // Remove quotes
      default:
        throw new Error('Invalid operator');
    }
  }

  if (node.type === 'operator') {
    const leftEval = evaluateAST(node.left, data);
    const rightEval = evaluateAST(node.right, data);

    if (node.value === 'AND') return leftEval && rightEval;
    else if (node.value === 'OR') return leftEval || rightEval;
    else  throw new Error(`Invalid operator node value: ${node.value}`);
  }

  throw new Error('Invalid node type');
}

// Combine multiple rules into a single AST
function combineRules(rules, operator) {
  if (rules.length !== 2) {
    throw new Error('combineRules expects exactly two rules');
  }

  const [leftRule, rightRule] = rules;

  const root = new Node('operator', operator);
  root.left = new Node('operand', leftRule);
  root.right = new Node('operand', rightRule);

  return root;
}

module.exports = { createAST, evaluateAST, combineRules, Node };
