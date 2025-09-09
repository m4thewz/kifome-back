import { DataTypes } from "sequelize";
import sequelize from "../index.js";

const RecipeIngredient = sequelize.define("RecipeIngredient", 
  {
    recipeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: "recipes", key: "id" }
    },
    ingredientId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: "ingredients", key: "id" }
    },
    quantity: { type: DataTypes.INTEGER, allowNull: true },
    unit: { type: DataTypes.STRING, allowNull: true }
  },
  {
    tableName: "recipe_ingredients",
    timestamps: false
  }
);

export default RecipeIngredient;
