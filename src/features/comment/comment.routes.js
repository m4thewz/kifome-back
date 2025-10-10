import { Router } from 'express';
const router = Router();
import * as commentController from './comment.controller.js';
import { authenticate } from '../../middlewares/auth.js';
import { checkCommentOwnership } from '../../middlewares/authorization.js';
import { validateComment, validateId } from '../../middlewares/validation.js';

// GET /api/comments/
router.get('/:id', validateId, commentController.getById);
router.put(
  '/:id',
  authenticate,
  validateId,
  checkCommentOwnership,
  validateComment,
  commentController.update
);
router.delete('/:id', authenticate, validateId, checkCommentOwnership, commentController.remove);

export default router;
