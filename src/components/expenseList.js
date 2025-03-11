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
