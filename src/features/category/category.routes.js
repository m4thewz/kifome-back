import { Router } from 'express';
const router = Router();
import * as categoryController from './category.controller.js';
import { validateId } from '../../middlewares/validation.js';

// /api/categories
router.get('/', categoryController.getAll);
router.get('/:id', validateId, categoryController.getById);

export default router;
