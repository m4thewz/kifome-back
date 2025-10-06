import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Recipe = sequelize.define(
  'Recipe',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    difficulty: {
      type: DataTypes.ENUM('easy', 'medium', 'hard'),
      defaultValue: 'medium',
      allowNull: false
    },
    preparation: { type: DataTypes.TEXT, allowNull: false },
    portionQuantity: { type: DataTypes.INTEGER, allowNull: true },
    portionUnit: {
      type: DataTypes.ENUM('serving', 'slice', 'unit', 'cup', 'bowl'),
      allowNull: true
    },
    prepTime: { type: DataTypes.INTEGER, allowNull: true },
    cookTime: { type: DataTypes.INTEGER, allowNull: true },
    likesCount: { type: DataTypes.INTEGER, defaultValue: 0 },
    averageRating: { type: DataTypes.DECIMAL(3, 2), defaultValue: 0.0 },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    }
  },
  {
    tableName: 'recipes',
    timestamps: true
  }
);

export default Recipe;
