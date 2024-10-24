const { createAST, evaluateAST, combineRules } = require('../ast');

// 1. Test createAST
describe('createAST', () => {
  it('should generate a correct AST from a rule string', () => {
    const rule = "age > 18 AND city = 'Delhi'";
    const ast = createAST(rule);

    expect(ast.type).toBe('operator');
    expect(ast.value).toBe('AND');
    expect(ast.left.value).toBe('age > 18');
    expect(ast.right.value).toBe("city = 'Delhi'");
  });
});

// 2. Test combineRules
describe('combineRules', () => {
  it('should combine multiple rules into a single AST', () => {
    const rules = ["age > 18", "city = 'Delhi'"];
    const combinedAST = combineRules(rules, 'AND');

    expect(combinedAST.type).toBe('operator');
    expect(combinedAST.value).toBe('AND');
    expect(combinedAST.left.value).toBe('age > 18');
    expect(combinedAST.right.value).toBe("city = 'Delhi'");
  });
});

// 3. Test evaluateAST
describe('evaluateAST', () => {
  const ast = createAST("age > 18 AND city = 'Delhi'");

  it('should return true for matching data', () => {
    const data = { age: 20, city: 'Delhi' };
    const result = evaluateAST(ast, data);

    expect(result).toBe(true);
  });

  it('should return false for non-matching data', () => {
    const data = { age: 16, city: 'Delhi' };
    const result = evaluateAST(ast, data);

    expect(result).toBe(false);
  });
});
