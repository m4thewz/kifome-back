import { Router } from 'express'
const router = Router()
import * as feedbackController from './feedback.controller.js'
import { authenticate } from '../../middlewares/auth.js';
import { validateRating, validateId } from '../../middlewares/validation.js';

// /api/recipes
router.post('/:id/like', authenticate, validateId, feedbackController.like);
router.delete('/:id/like', authenticate, validateId, feedbackController.unlike);
router.post('/:id/rate', authenticate, validateId, validateRating, feedbackController.rate);
router.get('/:id/rating', validateId, feedbackController.getRating);

export default router
