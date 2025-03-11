
import { DataTypes } from 'sequelize';
import { sequelize } from '../db';

const Expense = sequelize.define('Expense', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
});

export default Expense;
