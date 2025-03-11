
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import budgetRoutes from './routes/budgetRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import { sequelize } from './db.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/budgets', budgetRoutes);
app.use('/api/expenses', expenseRoutes);

const port = process.env.PORT || 5000;

sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.log('Error syncing database:', err);
  });
