import { Router } from 'express';
import { register, login, getMe } from '../controllers/auth.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = new Router();

// Register
// localhost://4444/api/auth/register
router.post('/register', register);

// Login
// localhost://4444/api/auth/login
router.post('/login', login);

// Get Me
// localhost://4444/api/auth/me
router.get('/me', checkAuth, getMe);

export default router;
