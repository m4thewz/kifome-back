import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Ingredient = sequelize.define(
  'Ingredient',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    displayName: { type: DataTypes.STRING, allowNull: false }
  },
  {
    tableName: 'ingredients',
    timestamps: false
  }
);

export default Ingredient;
