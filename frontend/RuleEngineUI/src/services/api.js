export const combineRules = async (rules) => {
    try {
      const response = await fetch('/api/combine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rules }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error combining rules:', error);
      throw error;
    }
  };
  