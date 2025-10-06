import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Category = sequelize.define(
  'Category',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    displayName: { type: DataTypes.STRING, allowNull: false },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    icon: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  },
  {
    tableName: 'categories',
    timestamps: false
  }
);

export default Category;
