import asyncHandler from '../../utils/asyncHandler.js';
import RecipeService from './recipe.service.js';

export const getAll = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const { search, category, difficulty, sortBy } = req.query;
  const { recipes, count } = await RecipeService.getAllRecipes(page, limit, {
    search,
    category,
    difficulty,
    sortBy
  });

  res.json({
    success: true,
    data: recipes,
    pagination: {
      page,
      limit,
      total_items: count,
      total_pages: Math.ceil(count / limit)
    }
  });
});

export const getById = asyncHandler(async (req, res) => {
  const recipe = await RecipeService.getRecipeById(req.params.id);
  res.json({
    success: true,
    data: recipe
  });
});

export const create = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    preparation,
    portionQuantity,
    portionUnit,
    prepTime,
    cookTime,
    ingredients,
    categories
  } = req.body;
  const recipe = await RecipeService.createRecipe(
    {
      title,
      description,
      preparation,
      portionQuantity,
      portionUnit,
      prepTime,
      cookTime,
      authorId: req.user.id
    },
    ingredients,
    categories
  );

  res.status(201).json({
    success: true,
    message: 'Created recipe successfully',
    data: recipe
  });
});

export const update = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    preparation,
    portionQuantity,
    portionUnit,
    prepTime,
    cookTime,
    ingredients,
    categories
  } = req.body;

  const recipe = await RecipeService.updateRecipe(
    req.params.id,
    {
      title,
      description,
      preparation,
      portionQuantity,
      portionUnit,
      prepTime,
      cookTime
    },
    ingredients,
    categories
  );

  res.json({
    success: true,
    message: 'Updated recipe successfully',
    data: recipe
  });
});

export const remove = asyncHandler(async (req, res) => {
  await req.recipe.destroy();

  res.json({
    success: true,
    message: 'Deleted recipe successfully'
  });
});
