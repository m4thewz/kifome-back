import { Router } from 'express';
const router = Router();

import authRoutes from '../features/auth/auth.routes.js';
import userRoutes from '../features/user/user.routes.js';
import recipeRoutes from '../features/recipe/recipe.routes.js';
import likeRoutes from '../features/like/like.routes.js'
import recipeCommentRoutes from '../features/comment/recipeComment.routes.js';
import commentRoutes from '../features/comment/comment.routes.js';
import categoryRoutes from '../features/category/category.routes.js';

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);
router.use('/recipes', likeRoutes);
router.use('/recipes', recipeCommentRoutes);
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
