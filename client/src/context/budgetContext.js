import React, { createContext, useState, useContext, useEffect } from 'react';

const BudgetContext = createContext();

export const useBudget = () => {
  return useContext(BudgetContext);
};

export const BudgetProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
 
    const savedBudgets = JSON.parse(localStorage.getItem('budgets')) || [];
    setBudgets(savedBudgets);
  }, []);

  const addBudget = (newBudget) => {
    const updatedBudgets = [...budgets, newBudget];
    setBudgets(updatedBudgets);
    localStorage.setItem('budgets', JSON.stringify(updatedBudgets));
  };

  const deleteBudget = (budgetId) => {
    const updatedBudgets = budgets.filter(budget => budget.id !== budgetId);
    setBudgets(updatedBudgets);
    localStorage.setItem('budgets', JSON.stringify(updatedBudgets));
  };

  const updateBudget = (updatedBudget) => {
    const updatedBudgets = budgets.map(budget =>
      budget.id === updatedBudget.id ? updatedBudget : budget
    );
    setBudgets(updatedBudgets);
    localStorage.setItem('budgets', JSON.stringify(updatedBudgets));
  };

  return (
    <BudgetContext.Provider value={{ budgets, addBudget, deleteBudget, updateBudget }}>
      {children}
    </BudgetContext.Provider>
  );
};