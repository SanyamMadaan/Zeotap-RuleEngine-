const express=require('express');
const {createAST,evaluateAST}=require('../ast');
const Rule=require('../models/Rule');
const router=express.Router();

// Create a new rule
router.post('/', async (req, res) => {
    try {
      const { ruleString } = req.body;
      const ast = createAST(ruleString);
      const newRule = new Rule({ ruleString, ast });
      await newRule.save();
      res.status(201).json(newRule);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create rule' });
    }
  });

  // Combine multiple rules into a single AST
router.post('/combine', async (req, res) => {
  try {
    const { ruleStrings, operator } = req.body; // e.g., ["A > 5", "B < 10"]
    const combinedAST = combine_rules(ruleStrings, operator || 'AND');
    res.status(200).json(combinedAST);
  } catch (error) {
    res.status(500).json({ error: 'Failed to combine rules' });
  }
});

  // Evaluate a rule with user data
router.post('/evaluate', async (req, res) => {
    try {
      const { ruleId, data } = req.body;
      const rule = await Rule.findById(ruleId);
      if (!rule) return res.status(404).json({ error: 'Rule not found' });
  
      const result = evaluateAST(rule.ast, data);
      res.json({ result });
    } catch (error) {
      res.status(500).json({ error: 'Failed to evaluate rule' });
    }
});

module.exports=router;
