import { Router } from 'express';
const router = Router();

import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import recipeRoutes from './recipe.routes.js';
import commentRoutes from './comment.routes.js';
import categoryRoutes from './category.routes.js';

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);
router.use('/comments', commentRoutes);
router.use('/categories', categoryRoutes);

router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'KiFome API working!',
    timestamp: new Date().toISOString()
  });
});

export default router;
