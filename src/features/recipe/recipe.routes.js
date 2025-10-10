import { Router } from 'express';
const router = Router();
import * as recipeController from './recipe.controller.js';
import { authenticate } from '../../middlewares/auth.js';
import { checkRecipeOwnership } from '../../middlewares/authorization.js';
import { validateRecipeCreate,validateId } from '../../middlewares/validation.js';

// /api/recipes
router.get('/', recipeController.getAll);
router.get('/:id', validateId, recipeController.getById);
router.post('/', authenticate, validateRecipeCreate, recipeController.create);
router.put('/:id', authenticate, validateId, checkRecipeOwnership, recipeController.update);
router.delete('/:id', authenticate, validateId, checkRecipeOwnership, recipeController.remove);

export default router;
