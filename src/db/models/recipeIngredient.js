import { Sequelize } from "sequelize";
import db from "../index.js";

const RecipeIngredient = db.define("RecipeIngredient", 
  {
    recipeId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: { model: "recipes", key: "id" }
    },
    ingredientId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: { model: "ingredients", key: "id" }
    },
    quantity: { type: Sequelize.INTEGER, allowNull: true },
    unit: { type: Sequelize.STRING, allowNull: true }
  },
  {
    tableName: "recipe_ingredients",
    timestamps: false
  }
);

export default RecipeIngredient;
