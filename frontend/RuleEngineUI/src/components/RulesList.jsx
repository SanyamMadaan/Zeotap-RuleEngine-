import React from 'react';
import RuleItem from './RuleItem';

const RulesList = ({ rules }) => {
  return (
    <div>
      <h3>Added Rules:</h3>
      {rules.length === 0 ? <p><u>No rules added yet.</u></p> : (
        <ul>
          {rules.map((rule, index) => (
            <RuleItem key={index} ruleString={rule.ruleString} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default RulesList;
