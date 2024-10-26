import React, { useState } from 'react';

const RuleForm = ({ onAddRule }) => {
  const [rule, setRule] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddRule(rule);
    setRule('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={rule}
        onChange={(e) => setRule(e.target.value)}
        placeholder="Enter rule (e.g. age > 18)"
        required
      />
      <button type="submit">Add Rule</button>
    </form>
  );
};

export default RuleForm;
