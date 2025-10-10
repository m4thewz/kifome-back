import AppError from '../../utils/AppError.js';
import sequelize from '../../db/index.js';
import { Op } from 'sequelize';
import {
  Recipe,
  Ingredient,
  Category,
  RecipeIngredient,
  RecipeCategory,
  User,
  Comment
} from '../../db/models.js';
import normalizeText from '../../utils/normalizeText.js';

class RecipeService {
  static async getAllRecipes(page, limit, filters) {
    const offset = (page - 1) * limit;
    const whereClause = {};

    if (filters.search) {
      whereClause.title = { [Op.like]: `%${filters.search}%` };
    }

    if (filters.difficulty) {
      whereClause.difficulty = filters.difficulty;
    }

    // default order: most recent
    let order = [['createdAt', 'DESC']];
    if (filters.sortBy === 'popular') {
      order = [['likesCount', 'DESC']];
    } else if (filters.sortBy === 'rating') {
      order = [['averageRating', 'DESC']];
    }

    const { count, rows: recipes } = await Recipe.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order,
      distinct: true,
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

    return { recipes, count };
  }

  static async getRecipeById(id) {
    const recipe = await Recipe.findByPk(id, {
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
      throw new AppError('Recipe not found', 404);
    }

    return recipe;
  }

  static async createRecipe(data, ingredients, categories) {
    const t = await sequelize.transaction();

    try {
      const recipe = await Recipe.create(data, { transaction: t });

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

      return fullRecipe;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  static async updateRecipe(recipeId, data, ingredients, categories) {
    const t = await sequelize.transaction();

    try {
      const recipe = await Recipe.findByPk(recipeId);

      await recipe.update(data, { transaction: t });

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

      return updatedRecipe;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  static async deleteRecipe(recipeId) {
    const recipe = await Recipe.findByPk(recipeId);
    await recipe.destroy();

    return;
  }
}

export default RecipeService;
