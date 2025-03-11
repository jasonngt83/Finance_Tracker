import React, { useState, useEffect } from 'react';
import './App.css';
import BudgetForm from './components/BudgetForm'; // Import the BudgetForm component

function App() {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const savedBudgets = JSON.parse(localStorage.getItem('budgets')) || [];
    setBudgets(savedBudgets);
  }, []);

  const handleBudgetSubmit = (name, amount) => {
    const newBudget = {
      name,
      amount: parseFloat(amount),
      expenses: [],
    };

    const updatedBudgets = [...budgets, newBudget];
    localStorage.setItem('budgets', JSON.stringify(updatedBudgets));
    setBudgets(updatedBudgets);
  };

  return (
    <div className="app">
      <header style={headerStyle}>
        <h1>Budget Buddies</h1>
        <h2>Where your Pennies find their Pals!</h2>
      </header>

      <BudgetForm handleBudgetSubmit={handleBudgetSubmit} /> {/* Using BudgetForm here */}

      <div className="budget-container">
        <h3>All Budgets</h3>
        {budgets.length > 0 ? (
          budgets.map((budget, budgetIndex) => (
            <div key={budgetIndex} className="budget-box">
              <div className="budget-header">
                <h4>{budget.name}</h4>
                <p>Amount: ${budget.amount.toFixed(2)}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No budgets created yet.</p>
        )}
      </div>
    </div>
  );
}

const headerStyle = {
  backgroundColor: '#333',
  color: 'white',
  padding: '10px',
  textAlign: 'center',
  width: '100%',
};

export default App;
