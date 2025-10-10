import { Comment, User, Recipe } from '../../db/models.js';
import AppError from '../../utils/AppError.js';

class CommentService {
  static async createComment(content, recipeId, userId) {
    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      throw new AppError('Recipe not found', 404);
    }

    const comment = await Comment.create({ content, userId, recipeId });
    const commentWithAuthor = await comment.reload({
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name', 'username', 'avatar']
        }
      ]
    });

    return commentWithAuthor;
  }

  static async getCommentById(id) {
    const comment = await Comment.findByPk(id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name', 'username', 'avatar']
        }
      ]
    });
    if (!comment) {
      throw new AppError('Comment not found', 404);
    }

    return comment;
  }

  static async getRecipeComments(recipeId, page, limit) {
    const offset = (page - 1) * limit;

    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      throw new AppError('Recipe not found', 404);
    }

    const { count, rows: comments } = await Comment.findAndCountAll({
      where: { recipeId },
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      distinct: true,
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name', 'username', 'avatar']
        }
      ]
    });

    return { comments, count };
  }

  static async updateComment(id, data) {
    const comment = await Comment.findByPk(id);
    await comment.update(data);

    return comment;
  }

  static async deleteComment(id) {
    const comment = await Comment.findByPk(id);
    await comment.destroy();

    return;
  }
}

export default CommentService;
