import sequelize from '../database.js';
import { Category, Recipe, User } from '../models/index.js';
import asyncHandler from '../utils/asyncHandler.js';

const getAll = asyncHandler(async (req, res) => {
  const categories = await Category.findAll({
    attributes: [
      'id',
      'name',
      'displayName',
      'description',
      'icon',
      [sequelize.fn('COUNT', sequelize.col('recipes.id')), 'recipesCount']
    ],
    include: [
      {
        model: Recipe,
        as: 'recipes',
        attributes: [],
        through: { attributes: [] }
      }
    ],
    group: ['Category.id']
  });

  res.json({
    success: true,
    data: { categories }
  });
});

const getById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const category = await Category.findByPk(id);

  if (!category) {
    return res.status(404).json({
      success: false,
      error: { message: 'Category not found' }
    });
  }

  const { count, rows: recipes } = await Recipe.findAndCountAll({
    include: [
      {
        model: Category,
        as: 'categories',
        where: { id },
        attributes: [],
        through: { attributes: [] }
      },
      {
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'username']
      }
    ],
    limit,
    offset,
    order: [['createdAt', 'DESC']],
    distinct: true
  });

  res.json({
    success: true,
    data: {
      category,
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

export default { getAll, getById };
