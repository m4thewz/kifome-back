import AppError from '../../utils/AppError.js';
import { User, Recipe, Category } from '../../db/models.js';

class UserService {
  static async getUserById(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  static async getUserRecipes(userId, page, limit) {
    const offset = (page - 1) * limit;
    const { count, rows: recipes } = await Recipe.findAndCountAll({
      where: { authorId: userId },
      limit,
      offset,
      distinct: true,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Category,
          as: 'categories',
          attributes: ['name', 'displayName'],
          through: { attributes: [] }
        }
      ]
    });

    return { recipes, count };
  }

  static async updateProfile(userId, data) {
    const user = await User.findByPk(userId);
    await user.update(data);

    return user;
  }

  static async deleteUser(userId) {
    const user = await User.findByPk(userId);
    await user.destroy();

    return;
  }
}

export default UserService;
