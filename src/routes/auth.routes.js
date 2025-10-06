import { Router } from 'express';
const router = Router();
import authController from '../controllers/authController.js';
import { authenticate } from '../middlewares/auth.js';
import { validateUserRegister, validateUserLogin } from '../middlewares/validation.js';

// POST /api/auth/register
router.post('/register', validateUserRegister, authController.register);

// POST /api/auth/login
router.post('/login', validateUserLogin, authController.login);

// GET /api/auth/me
router.get('/me', authenticate, authController.getMe);

export default router;
