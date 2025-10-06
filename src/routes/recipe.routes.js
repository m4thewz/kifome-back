import { Router } from 'express';
const router = Router();
import recipeController from '../controllers/recipeController.js';
import commentController from '../controllers/commentController.js';
import likeController from '../controllers/likeController.js';
import { authenticate } from '../middlewares/auth.js';
import { checkRecipeOwnership } from '../middlewares/authorization.js';
import {
  validateRecipeCreate,
  validateComment,
  validateRating,
  validateId
} from '../middlewares/validation.js';

// GET /api/recipes
router.get('/', recipeController.getAll);

// GET /api/recipes/:id
router.get('/:id', validateId, recipeController.getById);

// POST /api/recipes
router.post('/', authenticate, validateRecipeCreate, recipeController.create);

// PUT /api/recipes/:id
router.put('/:id', authenticate, validateId, checkRecipeOwnership, recipeController.update);

// DELETE /api/recipes/:id
router.delete('/:id', authenticate, validateId, checkRecipeOwnership, recipeController.remove);

// GET /api/recipes/:id/comments
router.get('/:id/comments', validateId, commentController.getRecipeComments);

// POST /api/recipes/:id/comments
router.post('/:id/comments', authenticate, validateId, validateComment, commentController.create);

// POST /api/recipes/:id/like
router.post('/:id/like', authenticate, validateId, likeController.like);

// DELETE /api/recipes/:id/like
router.delete('/:id/like', authenticate, validateId, likeController.unlike);

// POST /api/recipes/:id/rate
router.post('/:id/rate', authenticate, validateId, validateRating, likeController.rate);

// GET /api/recipes/:id/rating
router.get('/:id/rating', validateId, likeController.getRating);

export default router;
