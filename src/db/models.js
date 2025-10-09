import User from '../features/user/user.model.js';
import Recipe from '../features/recipe/recipe.model.js';
import Ingredient from '../features/recipe/ingredient.model.js';
import RecipeIngredient from '../features/recipe/recipeIngredient.model.js';
import Comment from '../features/comment/comment.model.js';
import Like from '../features/like/like.model.js';
import Rating from '../features/like/rating.model.js';
import Category from '../features/category/category.model.js';
import RecipeCategory from '../features/category/recipeCategory.model.js';

// user associations
User.hasMany(Recipe, { foreignKey: 'authorId', as: 'recipes' });
Recipe.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'author' });

// recipe associations
Recipe.hasMany(Comment, { foreignKey: 'recipeId', as: 'comments' });
Comment.belongsTo(Recipe, { foreignKey: 'recipeId', as: 'recipe' });

// likes associations
User.belongsToMany(Recipe, {
  through: Like,
  foreignKey: 'userId',
  as: 'likedRecipes'
});
Recipe.belongsToMany(User, {
  through: Like,
  foreignKey: 'recipeId',
  as: 'likedBy'
});

// ratings associations
User.belongsToMany(Recipe, {
  through: Rating,
  foreignKey: 'userId',
  as: 'ratedRecipes'
});
Recipe.belongsToMany(User, {
  through: Rating,
  foreignKey: 'recipeId',
  as: 'ratedBy'
});

// many-to-many associations
Recipe.belongsToMany(Category, {
  through: RecipeCategory,
  foreignKey: 'recipeId',
  as: 'categories'
});
Category.belongsToMany(Recipe, {
  through: RecipeCategory,
  foreignKey: 'categoryId',
  as: 'recipes'
});

// ingredients associations
Recipe.belongsToMany(Ingredient, {
  through: RecipeIngredient,
  foreignKey: 'recipeId',
  as: 'ingredients'
});
Ingredient.belongsToMany(Recipe, {
  through: RecipeIngredient,
  foreignKey: 'ingredientId',
  as: 'recipes'
});

export {
  User,
  Recipe,
  Ingredient,
  RecipeIngredient,
  Comment,
  Like,
  Rating,
  Category,
  RecipeCategory
};
