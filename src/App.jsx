import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [budgetName, setBudgetName] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const savedBudgets = JSON.parse(localStorage.getItem('budgets')) || [];
    setBudgets(savedBudgets);
  }, []);

  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    const newBudget = {
      name: budgetName,
      amount: parseFloat(budgetAmount),
      expenses: [],
    };

    const updatedBudgets = [...budgets, newBudget];
    localStorage.setItem('budgets', JSON.stringify(updatedBudgets));
    setBudgets(updatedBudgets);
    setBudgetName('');
    setBudgetAmount('');
  };

  const handleExpenseSubmit = (e, budgetIndex) => {
    e.preventDefault();
    const newExpense = {
      name: expenseName,
      amount: parseFloat(expenseAmount),
    };

    const updatedBudgets = [...budgets];
    updatedBudgets[budgetIndex].expenses.push(newExpense);
    localStorage.setItem('budgets', JSON.stringify(updatedBudgets));
    setBudgets(updatedBudgets);
    setExpenseName('');
    setExpenseAmount(0);
  };

  const handleDeleteBudget = (budgetIndex) => {
    const updatedBudgets = budgets.filter((_, index) => index !== budgetIndex);
    localStorage.setItem('budgets', JSON.stringify(updatedBudgets));
    setBudgets(updatedBudgets);
  };

  const handleDeleteExpense = (budgetIndex, expenseIndex) => {
    const updatedBudgets = [...budgets];
    updatedBudgets[budgetIndex].expenses = updatedBudgets[budgetIndex].expenses.filter(
      (_, index) => index !== expenseIndex
    );
    localStorage.setItem('budgets', JSON.stringify(updatedBudgets));
    setBudgets(updatedBudgets);
  };

  const calculateTotalExpense = (budgetIndex) => {
    const total = budgets[budgetIndex].expenses.reduce((sum, expense) => sum + expense.amount, 0);
    return total.toFixed(2); 
  };

  const handleLogout = () => {
    console.log("Logged out!");
    localStorage.clear();
    setBudgets([]);
  };

  return (
    <>
      <div className="welcomeHeader">
        {/* Any additional properties or content you want to add */}
      </div>

      <header style={headerStyle}>
        <h1>Budget Buddies</h1>
        <h2>Where your Pennies find their Pals!</h2>
        <button onClick={handleLogout} className="logout-button">Log Out</button>
      </header>

      <div className="app">
        <form onSubmit={handleBudgetSubmit} className="form">
          <h3>Create Budget</h3>
          <label htmlFor="budget-name">Budget Name</label>
          <input
            type="text"
            id="budget-name"
            name="budget-name"
            value={budgetName}
            onChange={(e) => setBudgetName(e.target.value)}
            required />
          <br />
          <br />
          <label htmlFor="budget-amount">Amount</label>
          <input
            type="number"
            id="budget-amount"
            name="budget-amount"
            value={budgetAmount}
            onChange={(e) => setBudgetAmount(e.target.value)}
            required />
          <br />
          <br />
          <input type="submit" value="Create Budget" />
        </form>

        <div className="budget-container">
          <h3>All Budgets</h3>
          {budgets.length > 0 ? (
            budgets.map((budget, budgetIndex) => (
              <div key={budgetIndex} className="budget-box">
                <div className="budget-header">
                  <h4>{budget.name}</h4>
                  <p>Amount: ${budget.amount.toFixed(2)}</p>
                  <p>Total Expenses: ${calculateTotalExpense(budgetIndex)}</p>
                  <button onClick={() => handleDeleteBudget(budgetIndex)} className="delete-button">
                    Delete Budget
                  </button>
                </div>

                <div className="expenses">
                  <h5>Expenses</h5>
                  <ul>
                    {budget.expenses.length > 0 ? (
                      budget.expenses.map((expense, expenseIndex) => (
                        <li key={expenseIndex}>
                          {expense.name}: ${expense.amount.toFixed(2)}
                          <button
                            onClick={() => handleDeleteExpense(budgetIndex, expenseIndex)}
                            className="delete-button"
                          >
                            Delete Expense
                          </button>
                        </li>
                      ))
                    ) : (
                      <li>No expenses added yet.</li>
                    )}
                  </ul>
                </div>

                <form onSubmit={(e) => handleExpenseSubmit(e, budgetIndex)} className="expense-form">
                  <h5>Add Expense to {budget.name}</h5>
                  <label htmlFor={`expense-name-${budgetIndex}`}>Expense Name</label>
                  <input
                    type="text"
                    id={`expense-name-${budgetIndex}`}
                    name="expense-name"
                    value={expenseName}
                    onChange={(e) => setExpenseName(e.target.value)}
                    required />
                  <br />
                  <br />
                  <label htmlFor={`expense-amount-${budgetIndex}`}>Expense Amount</label>
                  <input
                    type="number"
                    id={`expense-amount-${budgetIndex}`}
                    name="expense-amount"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    required />
                  <br />
                  <br />
                  <input type="submit" value="Add Expense" />
                </form>
              </div>
            ))
          ) : (
            <p>No budgets created yet.</p>
          )}
        </div>
      </div>
    </>
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
