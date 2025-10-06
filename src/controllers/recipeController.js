import sequelize from '../database.js';
import { Op } from 'sequelize';
import {
  Recipe,
  Ingredient,
  Category,
  RecipeIngredient,
  RecipeCategory,
  User,
  Comment
} from '../models/index.js';
import normalizeText from '../utils/normalizeText.js';
import asyncHandler from '../utils/asyncHandler.js';

const getAll = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  // optional filters
  const { search, category, difficulty, sortBy } = req.query;
  const whereClause = {};

  if (search) {
    whereClause.title = { [Op.like]: `%${search}%` };
  }

  if (difficulty) {
    whereClause.difficulty = difficulty;
  }

  // default order: most recent
  let order = [['createdAt', 'DESC']];
  if (sortBy === 'popular') {
    order = [['likesCount', 'DESC']];
  } else if (sortBy === 'rating') {
    order = [['averageRating', 'DESC']];
  }

  const { count, rows: recipes } = await Recipe.findAndCountAll({
    where: whereClause,
    limit,
    offset,
    order,
    attributes: { exclude: ['authorId'] },
    include: [
      {
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'username', 'avatar']
      },
      {
        model: Ingredient,
        as: 'ingredients',
        through: { attributes: ['quantity', 'unit'] },
        attributes: ['name', 'displayName']
      },
      {
        model: Category,
        as: 'categories',
        attributes: ['name', 'displayName'],
        through: { attributes: [] }
      },
      {
        model: User,
        as: 'likedBy',
        attributes: ['id', 'username'],
        through: { attributes: [] }
      }
    ]
  });

  res.json({
    success: true,
    data: {
      recipes,
      pagination: {
        page,
        limit,
        total: count,
        pages: Math.ceil(count / limit)
      }
    }
  });
});

const getById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const recipe = await Recipe.findByPk(id, {
    attributes: { exclude: ['authorId'] },
    include: [
      {
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'username', 'avatar']
      },
      {
        model: Ingredient,
        as: 'ingredients',
        through: { attributes: ['quantity', 'unit'] },
        attributes: ['id', 'name', 'displayName']
      },
      {
        model: Category,
        as: 'categories',
        attributes: ['id', 'name', 'displayName'],
        through: { attributes: [] }
      },
      {
        model: Comment,
        as: 'comments',
        attributes: ['id', 'content', 'createdAt'],
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['id', 'username', 'avatar']
          }
        ],
        limit: 5, // last 5 comments
        order: [['createdAt', 'DESC']]
      },
      {
        model: User,
        as: 'likedBy',
        attributes: ['id', 'username'],
        through: { attributes: [] }
      }
    ]
  });

  if (!recipe) {
    return res.status(404).json({
      success: false,
      error: { message: 'Recipe not found' }
    });
  }

  res.json({
    success: true,
    data: recipe
  });
});

const create = asyncHandler(async (req, res) => {
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

  const authorId = req.user.id;
  const t = await sequelize.transaction();

  try {
    const recipe = await Recipe.create(
      {
        title,
        description,
        preparation,
        portionQuantity,
        portionUnit,
        prepTime,
        cookTime,
        authorId
      },
      { transaction: t }
    );

    for (const ing of ingredients) {
      const normalizedIngredientName = normalizeText(ing.name);

      const [ingredient] = await Ingredient.findOrCreate({
        where: { name: normalizedIngredientName },
        defaults: {
          name: normalizedIngredientName,
          displayName: ing.name
        },
        transaction: t
      });

      await RecipeIngredient.create(
        {
          recipeId: recipe.id,
          ingredientId: ingredient.id,
          quantity: ing.quantity,
          unit: ing.unit || 'unit'
        },
        { transaction: t }
      );
    }

    for (const cat of categories) {
      const normalizedCategoryName = normalizeText(cat);

      const [category] = await Category.findOrCreate({
        where: { name: normalizedCategoryName },
        defaults: {
          name: normalizedCategoryName,
          displayName: cat
        },
        transaction: t
      });

      await RecipeCategory.create(
        {
          recipeId: recipe.id,
          categoryId: category.id
        },
        { transaction: t }
      );
    }

    await t.commit();

    const fullRecipe = await Recipe.findByPk(recipe.id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name', 'username']
        },
        {
          model: Ingredient,
          as: 'ingredients',
          through: { attributes: ['quantity', 'unit'] }
        },
        {
          model: Category,
          as: 'categories',
          attributes: ['name', 'displayName']
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Created recipe successfully',
      data: fullRecipe
    });
  } catch (error) {
    await t.rollback();
    throw error;
  }
});

const update = asyncHandler(async (req, res) => {
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

  const t = await sequelize.transaction();

  try {
    const recipe = req.recipe; // from checkRecipeOwnership middleware

    await recipe.update(
      {
        title,
        description,
        preparation,
        portionQuantity,
        portionUnit,
        prepTime,
        cookTime
      },
      { transaction: t }
    );

    if (ingredients && ingredients.length > 0) {
      const currentIngredients = await recipe.getIngredients({ transaction: t });

      const newIngredients = ingredients.map(ing => ({
        name: normalizeText(ing.name),
        displayName: ing.name,
        quantity: ing.quantity,
        unit: ing.unit || 'unit'
      }));

      const newIngredientsNames = newIngredients.map(ing => ing.name);

      for (const currentIng of currentIngredients) {
        if (!newIngredientsNames.includes(currentIng.name)) {
          await RecipeIngredient.destroy({
            where: { recipeId: recipe.id, ingredientId: currentIng.id },
            transaction: t
          });
        }
      }

      for (const ing of newIngredients) {
        const [ingredient] = await Ingredient.findOrCreate({
          where: { name: ing.name },
          defaults: { name: ing.name, displayName: ing.displayName },
          transaction: t
        });

        await RecipeIngredient.upsert(
          {
            recipeId: recipe.id,
            ingredientId: ingredient.id,
            quantity: ing.quantity,
            unit: ing.unit
          },
          { transaction: t }
        );
      }
    }

    if (categories && categories.length > 0) {
      const currentCategories = await recipe.getCategories({ transaction: t });
      const newCategories = categories.map(cat => normalizeText(cat));

      for (const currentCat of currentCategories) {
        if (!newCategories.includes(currentCat.name)) {
          await RecipeCategory.destroy({
            where: { recipeId: recipe.id, categoryId: currentCat.id },
            transaction: t
          });
        }
      }

      for (const cat of categories) {
        const normalizedCategoryName = normalizeText(cat);

        const [category] = await Category.findOrCreate({
          where: { name: normalizedCategoryName },
          defaults: { name: normalizedCategoryName, displayName: cat },
          transaction: t
        });

        await RecipeCategory.findOrCreate({
          where: { recipeId: recipe.id, categoryId: category.id },
          transaction: t
        });
      }
    }

    await t.commit();

    const updatedRecipe = await Recipe.findByPk(recipe.id, {
      include: [
        {
          model: Ingredient,
          as: 'ingredients',
          through: { attributes: ['quantity', 'unit'] }
        },
        {
          model: Category,
          as: 'categories',
          attributes: ['name', 'displayName']
        }
      ]
    });

    res.json({
      success: true,
      message: 'Updated recipe successfully',
      data: updatedRecipe
    });
  } catch (error) {
    await t.rollback();
    throw error;
  }
});

const remove = asyncHandler(async (req, res) => {
  await req.recipe.destroy();

  res.json({
    success: true,
    message: 'Deleted recipe successfully'
  });
});

export default { getAll, getById, create, update, remove };
