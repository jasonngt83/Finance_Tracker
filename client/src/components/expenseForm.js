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
  
  <input type="submit" value="Add Expense" />
</form>