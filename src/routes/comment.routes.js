import { Router } from 'express';
const router = Router();
import commentController from '../controllers/commentController.js';
import { authenticate } from '../middlewares/auth.js';
import { checkCommentOwnership } from '../middlewares/authorization.js';
import { validateComment, validateId } from '../middlewares/validation.js';

// GET /api/comments/:id
router.get('/:id', validateId, commentController.getById);

// PUT /api/comments/:id
router.put(
  '/:id',
  authenticate,
  validateId,
  checkCommentOwnership,
  validateComment,
  commentController.update
);

// DELETE /api/comments/:id
router.delete('/:id', authenticate, validateId, checkCommentOwnership, commentController.remove);

export default router;
