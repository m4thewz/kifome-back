import sequelize from '../database.js';
import { Like, Recipe, Rating } from '../models/index.js';
import asyncHandler from '../utils/asyncHandler.js';

export const like = asyncHandler(async (req, res) => {
  const { id: recipeId } = req.params;
  const userId = req.user.id;

  const recipe = await Recipe.findByPk(recipeId);
  if (!recipe) {
    return res.status(404).json({
      success: false,
      error: { message: 'Recipe not found' }
    });
  }

  const existingLike = await Like.findOne({
    where: { recipeId, userId }
  });

  if (existingLike) {
    return res.status(400).json({
      success: false,
      error: { message: 'User already liked this recipe' }
    });
  }

  await Like.create({ recipeId, userId });
  await recipe.increment('likesCount');

  res.status(201).json({
    success: true,
    message: 'Liked recipe successfully',
    data: {
      recipeId: recipe.id,
      likes: recipe.likesCount + 1,
      isLiked: true
    }
  });
});

export const unlike = asyncHandler(async (req, res) => {
  const { id: recipeId } = req.params;
  const userId = req.user.id;

  const like = await Like.findOne({
    where: { recipeId, userId }
  });

  if (!like) {
    return res.status(404).json({
      success: false,
      error: { message: 'Like not found' }
    });
  }

  await like.destroy();

  const recipe = await Recipe.findByPk(recipeId);
  await recipe.decrement('likesCount');

  res.json({
    success: true,
    message: 'Removed like successfully',
    data: {
      recipeId: recipe.id,
      likes: Math.max(0, recipe.likesCount - 1),
      isLiked: false
    }
  });
});

export const rate = asyncHandler(async (req, res) => {
  const { id: recipeId } = req.params;
  const { rating } = req.body;
  const userId = req.user.id;

  const recipe = await Recipe.findByPk(recipeId);
  if (!recipe) {
    return res.status(404).json({
      success: false,
      error: { message: 'Recipe not found' }
    });
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

  res.json({
    success: true,
    message: created ? 'Rating registered successfully' : 'Rating updated successfully',
    data: {
      recipeId: recipe.id,
      userRating: rating,
      averageRating: parseFloat(averageRating),
      totalRatings
    }
  });
});

export const getRating = asyncHandler(async (req, res) => {
  const { id: recipeId } = req.params;

  const recipe = await Recipe.findByPk(recipeId);
  if (!recipe) {
    return res.status(404).json({
      success: false,
      error: { message: 'Recipe not found' }
    });
  }

  const totalRatings = await Rating.count({ where: { recipeId } });
  const distribution = {};

  for (let i = 1; i <= 5; i++) {
    const count = await Rating.count({
      where: { recipeId, rating: i }
    });
    distribution[i] = count;
  }

  res.json({
    success: true,
    data: {
      recipeId: recipe.id,
      averageRating: parseFloat(recipe.averageRating) || 0,
      totalRatings,
      ratingDistribution: distribution
    }
  });
});

