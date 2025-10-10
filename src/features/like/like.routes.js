import { Router } from 'express'
const router = Router()
import * as likeController from './like.controller.js'
import { authenticate } from '../../middlewares/auth.js';
import { validateRating, validateId } from '../../middlewares/validation.js';

// /api/recipes
router.post('/:id/like', authenticate, validateId, likeController.like);
router.delete('/:id/like', authenticate, validateId, likeController.unlike);
router.post('/:id/rate', authenticate, validateId, validateRating, likeController.rate);
router.get('/:id/rating', validateId, likeController.getRating);

export default router
