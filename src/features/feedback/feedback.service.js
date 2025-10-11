import sequelize from '../../db/index.js';
import { Like, Recipe, Rating } from '../../db/models.js';
import AppError from '../../utils/AppError.js';

class FeedbackService {
  static async getLike(userId, recipeId) {
    const like = await Like.findOne({ where: { userId, recipeId } });
    return like;
  }

  static async likeRecipe(userId, recipeId) {
    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      throw new AppError('Recipe not found', 404);
    }

    const [like, created] = await Like.findOrCreate({
      where: { recipeId, userId }
    });
    let likesCount = recipe.likesCount;

    if (created) {
      likesCount += 1;
      await recipe.increment('likesCount');
    } else {
      likesCount -= 1;
      await like.destroy();
      await recipe.decrement('likesCount');
    }

    return {
      liked: created,
      likesCount: Math.max(0, likesCount)
    };
  }

  static async rateRecipe(rating, userId, recipeId) {
    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      throw new AppError('Recipe not found', 404);
    }

    const [ratingRecord, created] = await Rating.findOrCreate({
      where: { recipeId, userId },
      defaults: { rating }
    });

    if (!created) {
      await ratingRecord.update({ rating });
    }

    const ratings = await Rating.findAll({
      where: { recipeId },
      attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'average']]
    });

    const averageRating = parseFloat(ratings[0].get('average')).toFixed(2);
    await recipe.update({ averageRating });

    const totalRatings = await Rating.count({ where: { recipeId } });

    return { created, averageRating, totalRatings };
  }

  static async getRecipeRating(recipeId) {
    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      throw new AppError('Recipe not found', 404);
    }

    const totalRatings = await Rating.count({ where: { recipeId } });
    const averageRating = parseFloat(recipe.averageRating) || 0;

    return { totalRatings, averageRating };
  }
}

export default FeedbackService;
