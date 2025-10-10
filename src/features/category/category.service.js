import sequelize from '../../db/index.js';
import { Category, Recipe, User } from '../../db/models.js';
import AppError from '../../utils/AppError.js';

class CategoryService {
  static async getAllCategories() {
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

    return categories;
  }

  static async getCategoryById(id, page, limit) {
    const offset = (page - 1) * limit;
    const category = await Category.findByPk(id);

    if (!category) {
      throw new AppError('Category not found', 404);
    }

    const { count, rows: recipes } = await Recipe.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      distinct: true,
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
          attributes: ['id', 'name', 'username', 'avatar']
        }
      ]
    });

    return { category, recipes, count };
  }
}

export default CategoryService;
