import { User, Recipe, Ingredient, RecipeIngredient, Comment, Like, Category, RecipeCategory } from "./models/index.js";

function applyAssociations() {
  User.hasMany(Recipe, { foreignKey: "authorUsername", sourceKey: "username", as: "recipes" });
  User.hasMany(Comment, { foreignKey: "authorUsername", sourceKey: "username", as: "comments" });
  User.belongsToMany(Recipe, {
    through: Like,
    foreignKey: "userId",
    otherKey: "recipeId",
    as: "likedRecipes",
  });

  Recipe.belongsTo(User, { foreignKey: "authorUsername", targetKey: "username", as: "author" });
  Recipe.hasMany(Comment, { foreignKey: "recipeId", as: "comments" });
  Recipe.belongsToMany(Ingredient, {
    through: RecipeIngredient,
    foreignKey: "recipeId",
    otherKey: "ingredientId",
    as: "ingredients",
  });
  Recipe.belongsToMany(Category, {
    through: RecipeCategory,
    foreignKey: "recipeId",
    otherKey: "categoryId",
    as: "categories",
  });
  Recipe.belongsToMany(User, {
    through: Like,
    foreignKey: "recipeId",
    otherKey: "userId",
    as: "likedBy",
  });

  Ingredient.belongsToMany(Recipe, {
    through: RecipeIngredient,
    foreignKey: "ingredientId",
    otherKey: "recipeId",
    as: "recipes",
  });

  RecipeIngredient.belongsTo(Recipe, { foreignKey: "recipeId" });
  RecipeIngredient.belongsTo(Ingredient, { foreignKey: "ingredientId" });

  Comment.belongsTo(Recipe, { foreignKey: "recipeId" });
  Comment.belongsTo(User, { foreignKey: "authorId", as: "author" });

  Like.belongsTo(User, { foreignKey: "userId" });
  Like.belongsTo(Recipe, { foreignKey: "recipeId" });

  Category.belongsToMany(Recipe, {
    through: RecipeCategory,
    foreignKey: "categoryId",
    otherKey: "recipeId",
    as: "recipes",
  });
}

export { applyAssociations };
