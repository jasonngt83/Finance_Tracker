// import React, { useState, useEffect } from 'react';

// const BudgetBuddies = () => {
//   const [budgetName, setBudgetName] = useState('');
//   const [budgetAmount, setBudgetAmount] = useState('');
//   const [expenses, setExpenses] = useState([]);
//   const [expenseName, setExpenseName] = useState('');
//   const [expenseAmount, setExpenseAmount] = useState('');

//   useEffect(() => {
//     const savedBudgetName = localStorage.getItem('budget-name');
//     const savedBudgetAmount = localStorage.getItem('budget-amount');
//     const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];

//     if (savedBudgetName && savedBudgetAmount) {
//       setBudgetName(savedBudgetName);
//       setBudgetAmount(savedBudgetAmount);
//     }

//     setExpenses(savedExpenses);
//   }, []);

//   const handleBudgetSubmit = (event) => {
//     event.preventDefault();

//     localStorage.setItem('budget-name', budgetName);
//     localStorage.setItem('budget-amount', budgetAmount);

//     alert('Budget saved to localStorage!');
//   };

//   const handleExpenseSubmit = (event) => {
//     event.preventDefault();

//     const newExpense = { expenseName, expenseAmount };
//     const newExpenses = [...expenses, newExpense];
//     setExpenses(newExpenses);

//     localStorage.setItem('expenses', JSON.stringify(newExpenses));

//     setExpenseName('');
//     setExpenseAmount('');

//     alert('Expense saved to localStorage!');
//   };

//   return (
//     <div>
//       <h1>Budget Buddies</h1>
//       <h2>Where your Pennies find their Pals!</h2>

//       <form onSubmit={handleBudgetSubmit}>
//         <h3>Create Budget</h3>
//         <label htmlFor="budget-name">Budget Name</label>
//         <input
//           type="text"
//           id="budget-name"
//           name="budget-name"
//           value={budgetName}
//           onChange={(e) => setBudgetName(e.target.value)}
//           required
//         />
//         <br />
//         <br />

//         <label htmlFor="budget-amount">Amount</label>
//         <input
//           type="number"
//           id="budget-amount"
//           name="budget-amount"
//           value={budgetAmount}
//           onChange={(e) => setBudgetAmount(e.target.value)}
//           required
//         />
//         <br />
//         <br />

//         <input type="submit" value="Create Budget" />
//       </form>

//       <form onSubmit={handleExpenseSubmit}>
//         <h3>Add New Expense</h3>
//         <label htmlFor="expense-name">Expense Name</label>
//         <input
//           type="text"
//           id="expense-name"
//           name="expense-name"
//           value={expenseName}
//           onChange={(e) => setExpenseName(e.target.value)}
//           required
//         />
//         <br />
//         <br />

//         <label htmlFor="expense-amount">Expense Amount</label>
//         <input
//           type="number"
//           id="expense-amount"
//           name="expense-amount"
//           value={expenseAmount}
//           onChange={(e) => setExpenseAmount(e.target.value)}
//           required
//         />
//         <br />
//         <br />

//         <input type="submit" value="Add Expense" />
//       </form>

//       <div id="budget-display">
//         <h3>Budget: {budgetName}</h3>
//         <p>Amount: ${parseFloat(budgetAmount).toFixed(2)}</p>
//       </div>

// \      <h3>Expenses</h3>
//       <ul>
//         {expenses.length === 0 ? (
//           <p>No expenses added.</p>
//         ) : (
//           expenses.map((expense, index) => (
//             <li key={index}>
//               {expense.expenseName}: ${parseFloat(expense.expenseAmount).toFixed(2)}
//             </li>
//           ))
//         )}
//       </ul>
//     </div>
//   );
// };

// export default BudgetBuddies;