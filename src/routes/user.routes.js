import { Router } from 'express';
const router = Router();
import userController from '../controllers/userController.js';
import { authenticate } from '../middlewares/auth.js';
import { validateId } from '../middlewares/validation.js';

// GET /api/users/:id
router.get('/:id', validateId, userController.getUserProfile);

// GET /api/users/:id/recipes
router.get('/:id/recipes', validateId, userController.getUserRecipes);

// PUT /api/users/me
router.put('/me', authenticate, userController.updateProfile);

// DELETE /api/users/me
router.delete('/me', authenticate, userController.deleteAccount);

export default router;
