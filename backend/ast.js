class Node{
    constructor(type,value=null,left=null,right=null){
        this.type=type;
        this.value=value;
        this.left=left;
        this.right=right;
    }
}
//Create AST
function createAST(ruleString){
    const tokens=ruleString.split(' ');
    let root=new Node('operator',tokens[1]);

    root.left=new Node('operand',tokens[0]+' '+tokens[2]+' '+tokens[3]);
    root.left=new Node('operand',tokens[4]+' '+tokens[6]+' '+tokens[7]);
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
  
  module.exports = { createAST, evaluateAST, Node };
  