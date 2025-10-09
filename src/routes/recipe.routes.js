import { Router } from 'express';
const router = Router();
import * as recipeController from '../controllers/recipeController.js';
import * as commentController from '../controllers/commentController.js';
import * as likeController from '../controllers/likeController.js';
import { authenticate } from '../middlewares/auth.js';
import { checkRecipeOwnership } from '../middlewares/authorization.js';
import {
  validateRecipeCreate,
  validateComment,
  validateRating,
  validateId
} from '../middlewares/validation.js';

// /api/recipes
router.get('/', recipeController.getAll);
router.get('/:id', validateId, recipeController.getById);
router.post('/', authenticate, validateRecipeCreate, recipeController.create);
router.put('/:id', authenticate, validateId, checkRecipeOwnership, recipeController.update);
router.delete('/:id', authenticate, validateId, checkRecipeOwnership, recipeController.remove);
router.get('/:id/comments', validateId, commentController.getRecipeComments);
router.post('/:id/comments', authenticate, validateId, validateComment, commentController.create);
router.post('/:id/like', authenticate, validateId, likeController.like);
router.delete('/:id/like', authenticate, validateId, likeController.unlike);
router.post('/:id/rate', authenticate, validateId, validateRating, likeController.rate);
router.get('/:id/rating', validateId, likeController.getRating);

export default router;
