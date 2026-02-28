import express from 'express';
import { register, login, getProfileUser } from '../auth/authController.js';
import { authMiddleware } from '../auth/authMiddleware.js';

const router = express.Router();

router.get('/users/me', authMiddleware, getProfileUser);
router.post('/register', register);
router.post('/login', login);


export default router;
