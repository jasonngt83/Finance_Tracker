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
            required
          />
          <br />
          <br />
          <label htmlFor={`expense-amount-${budgetIndex}`}>Expense Amount</label>
          <input
            type="number"
            id={`expense-amount-${budgetIndex}`}
            name="expense-amount"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            required
          />
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
