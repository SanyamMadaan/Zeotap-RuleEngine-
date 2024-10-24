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
  const tokens = ruleString.split(' ');

  // Assuming the format is: "field operator value AND/OR field operator value"
  let root = new Node('operator', tokens[3]); // 'AND' or 'OR'

  root.left = new Node('operand', `${tokens[0]} ${tokens[1]} ${tokens[2]}`); // e.g., 'age > 18'
  root.right = new Node('operand', `${tokens[4]} ${tokens[5]} ${tokens[6]}`); // e.g., "city = 'Delhi'"

  return root; // Return the constructed AST
}

// Evaluate AST with user data
function evaluateAST(node, data) {
  if (node.type === 'operand') {
    const [field, operator, value] = node.value.split(' ');

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
    if (node.value === 'OR') return leftEval || rightEval;
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
