
import Budget from '../models/budgetModel.js';

export const createBudget = async (req, res) => {
  try {
    const { name, amount } = req.body;
    const newBudget = await Budget.create({ name, amount });
    res.status(201).json(newBudget);
  } catch (error) {
    res.status(400).json({ message: 'Error creating budget', error });
  }
};

export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.findAll();
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching budgets', error });
  }
};
