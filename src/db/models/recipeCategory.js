import { DataTypes } from "sequelize";
import sequelize from "../index.js";

const RecipeCategory = sequelize.define("RecipeCategory",
  {
    recipeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: "recipes", key: "id" }
    },
    categoryId: {
      type: DataTypes.INTEGER,
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
