import React, { useEffect, useState , useCallback } from 'react';
import RuleForm from './components/RuleForm';
import RulesList from './components/RulesList';
import Result from './components/Result';
import axios from 'axios';
import './styles.css';

function App() {
  const [rules, setRules] = useState([]);
  const [combinedResult, setCombinedResult] = useState(null);

  const FetchRules=useCallback(async()=>{
    try{
    const response=await axios.get('http://localhost:3000/api/rules/getrules');
    console.log(response.data.data);
    setRules(response.data.data);
  }catch(error){
    console.log('Error fetching rules:',error);
  }
  },[]);

  useEffect(()=>{
    FetchRules();
  },[FetchRules]);

//there should be backend request
  const handleAddRule = async (newRule) => {
    const response=await axios.post('http://localhost:3000/api/rules');
    FetchRules();
  };

  //this will combine rules
  const handleCombineRules = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/rules/combine', {
        body:{rules}
      });
      const result =response.data;
      setCombinedResult(result);
    } catch (error) {
      console.error('Error combining rules:', error);
    }
  };

  return (
    <div className="App">
      <h1>Rule Engine</h1>
      <RuleForm onAddRule={handleAddRule} />
      <RulesList rules={rules} />{/*this will display rules*/}
      <button onClick={handleCombineRules}>Combine Rules</button>
      {combinedResult && <Result result={combinedResult} />}
    </div>
  );
}

export default App;
