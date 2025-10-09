import { Router } from 'express';
const router = Router();
import * as authController from './auth.controller.js';
import { authenticate } from '../../middlewares/auth.js';
import { validateUserRegister, validateUserLogin } from '../../middlewares/validation.js';

// /api/auth/
router.post('/register', validateUserRegister, authController.register);
router.post('/login', validateUserLogin, authController.login);
router.get('/me', authenticate, authController.getMe);

export default router;
