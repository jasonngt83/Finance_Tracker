// src/components/BudgetForm.js
import React, { useState } from 'react';

const BudgetForm = ({ handleBudgetSubmit }) => {
  const [budgetName, setBudgetName] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleBudgetSubmit(budgetName, budgetAmount); 
    setBudgetName('');
    setBudgetAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h3>Create Budget</h3>
      <label htmlFor="budget-name">Budget Name</label>
      <input
        type="text"
        id="budget-name"
        name="budget-name"
        value={budgetName}
        onChange={(e) => setBudgetName(e.target.value)}
        required
      />
      <br />
      <br />
      <label htmlFor="budget-amount">Amount</label>
      <input
        type="number"
        id="budget-amount"
        name="budget-amount"
        value={budgetAmount}
        onChange={(e) => setBudgetAmount(e.target.value)}
        required
      />
      <br />
      <br />
      <input type="submit" value="Create Budget" />
    </form>
  );
};

export default BudgetForm;