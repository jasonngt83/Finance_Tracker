
import { DataTypes } from 'sequelize';
import { sequelize } from '../db';  

const Budget = sequelize.define('Budget', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
});

export default Budget;
