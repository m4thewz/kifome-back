import asyncHandler from '../../utils/asyncHandler.js';
import FeedbackService from './feedback.service.js';

export const like = asyncHandler(async (req, res) => {
  const { id: recipeId } = req.params;
  const { liked, likesCount } = await FeedbackService.likeRecipe(req.user.id, recipeId);

  res.status(201).json({
    success: true,
    message: liked ? 'Liked recipe successfully' : 'Removed like successfully',
    data: {
      recipeId: Number(recipeId),
      likes: likesCount
    }
  });
});

export const rate = asyncHandler(async (req, res) => {
  const { id: recipeId } = req.params;
  const { rating } = req.body;
  const { created, averageRating, totalRatings } = await FeedbackService.rateRecipe(
    rating,
    req.user.id,
    recipeId
  );

  res.json({
    success: true,
    message: created ? 'Rating registered successfully' : 'Rating updated successfully',
    data: {
      recipeId: Number(recipeId),
      userRating: rating,
      averageRating: parseFloat(averageRating),
      totalRatings
    }
  });
});

export const getRating = asyncHandler(async (req, res) => {
  const { totalRatings, averageRating } = await FeedbackService.getRecipeRating(req.params.id);

  res.json({
    success: true,
    data: {
      recipeId: Number(req.params.id),
      totalRatings,
      averageRating: averageRating
    }
  });
});
