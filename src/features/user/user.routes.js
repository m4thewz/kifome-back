import { Router } from 'express';
const router = Router();
import * as userController from './user.controller.js';
import { authenticate } from '../../middlewares/auth.js';
import { validateId } from '../../middlewares/validation.js';

// /api/users/
router.get('/:id', validateId, userController.getUserProfile);
router.get('/:id/recipes', validateId, userController.getUserRecipes);
router.put('/me', authenticate, userController.updateProfile);
router.delete('/me', authenticate, userController.deleteAccount);

export default router;
