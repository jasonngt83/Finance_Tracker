
import Expense from '../models/expenseModel.js';

export const createExpense = async (req, res) => {
  try {
    const { name, amount, budgetId } = req.body;
    const newExpense = await Expense.create({ name, amount, budgetId });
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ message: 'Error creating expense', error });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expenses', error });
  }
};
