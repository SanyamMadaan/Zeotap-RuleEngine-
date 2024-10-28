const express=require('express');
const {createAST,evaluateAST, combineRules}=require('../ast');
const Rule=require('../models/Rule');
const router=express.Router();

// Create a new rule
router.post('/', async (req, res) => {
    try {
      const { ruleString } = req.body;
      console.log(req.body);
      const ast = createAST(ruleString);
      const newRule = new Rule({ ruleString, ast });
      await newRule.save();
      res.status(201).json(newRule);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  router.get('/getrules',async(req,res)=>{
    try{
      const allrules=await Rule.find({});
      console.log(allrules);
      res.status(200).json({data:allrules})
    }catch(err){
      res.status(400).json({msg:err})
    }
  })

  // Combine multiple rules into a single AST
router.post('/combine', async (req, res) => {
  try {
    const { ruleStrings, operator } = req.body; // e.g., ["A > 5", "B < 10"]
    const combinedAST = combineRules(ruleStrings, operator || 'AND');
    res.status(200).json(combinedAST);
  } catch (error) {
    res.status(500).json({ error: 'Failed to combine rules' });
  }
});

  // Evaluate a rule with user data
router.post('/evaluate', async (req, res) => {
    try {
      let { ruleId, data } = req.body;
      console.log('data is'+data);
      const rule = await Rule.findById(ruleId);
      if (!rule) return res.status(404).json({ error: 'Rule not found' });
  
      const result = evaluateAST(rule.ast, data);
      res.json({ result });
    } catch (error) {
      console.log(error);
      res.status(500).json( error);
    }
});

module.exports=router;
