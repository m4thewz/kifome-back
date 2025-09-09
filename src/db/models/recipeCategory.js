import { Sequelize } from "sequelize";
import db from "../index.js";

const RecipeCategory = db.define("RecipeCategory",
  {
    recipeId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: { model: "recipes", key: "id" }
    },
    categoryId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: { model: "categories", key: "id" }
    }
  },
  {
    tableName: "recipe_categories",
    timestamps: false
  }
);

export default RecipeCategory;
