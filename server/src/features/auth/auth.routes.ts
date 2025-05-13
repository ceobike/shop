import { Router } from 'express';
import { login, getCurrentUser } from './auth.controller';
import { authMiddleware } from '../../middleware/authMiddleware';
import { validateLogin } from './auth.validation';

const router = Router();

// Login route
router.post('/login', validateLogin, login);

// Get current user route (protected)
router.get('/me', authMiddleware, getCurrentUser);

export const authRoutes = router;
