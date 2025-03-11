
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getBudgets = async () => {
  try {
    const response = await axios.get(`${API_URL}/budgets`);
    return response.data;
  } catch (error) {
    console.error('Error fetching budgets:', error);
  }
};

export const createBudget = async (budget) => {
  try {
    const response = await axios.post(`${API_URL}/budgets`, budget);
    return response.data;
  } catch (error) {
    console.error('Error creating budget:', error);
  }
};
