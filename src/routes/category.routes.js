import { Router } from 'express';
const router = Router();
import categoryController from '../controllers/categoryController.js';
import { validateId } from '../middlewares/validation.js';

// GET /api/categories
router.get('/', categoryController.getAll);

// GET /api/categories/:id
router.get('/:id', validateId, categoryController.getById);

export default router;
