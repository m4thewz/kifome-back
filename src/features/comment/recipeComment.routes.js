import { Router } from 'express';
const router = Router();
import * as commentController from './comment.controller.js';
import { authenticate } from '../../middlewares/auth.js';
import { validateComment, validateId } from '../../middlewares/validation.js';

// /api/recipes
router.get('/:id/comments', validateId, commentController.getRecipeComments);
router.post('/:id/comments', authenticate, validateId, validateComment, commentController.create);

export default router;
