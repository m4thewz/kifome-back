import { DataTypes } from 'sequelize';
import sequelize from '../../db/index.js';

const RecipeIngredient = sequelize.define(
  'RecipeIngredient',
  {
    recipeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: 'recipes', key: 'id' }
    },
    ingredientId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: 'ingredients', key: 'id' }
    },
    quantity: { type: DataTypes.STRING, allowNull: true },
    unit: {
      type: DataTypes.ENUM(
        'unit',
        'kg',
        'g',
        'l',
        'ml',
        'cup',
        'tablespoon',
        'teaspoon',
        'pinch',
        'slice'
      ),
      allowNull: true
    }
  },
  {
    tableName: 'recipe_ingredients',
    timestamps: false
  }
);

export default RecipeIngredient;
