import { Recipe, Comment } from '../db/models.js';

export const checkRecipeOwnership = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        error: { message: 'Recipe not found' }
      });
    }

    if (recipe.authorId != req.user.id) {
      return res.status(403).json({
        success: false,
        error: { message: "You don't have permission to modify this recipe" }
      });
    }

    req.recipe = recipe;
    next();
  } catch (error) {
    console.error('Error verifying ownership:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Error verifying permissions' }
    });
  }
};

export const checkCommentOwnership = async (req, res, next) => {
  try {
    const comment = await Comment.findByPk(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        error: { message: 'Recipe not found' }
      });
    }

    if (comment.userId != req.user.id) {
      return res.status(403).json({
        success: false,
        error: { message: "You don't have permission to modify this comment" }
      });
    }

    req.comment = comment;
    next();
  } catch (error) {
    console.error('Error verifying ownership:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Error verifying permissions' }
    });
  }
};
