import React from 'react';

const Result = ({ result }) => {
  return (
    <div>
      <h3>Combined Rule (AST):</h3>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
};

export default Result;
