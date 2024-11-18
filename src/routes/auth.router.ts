import { Router } from 'express';
import { loginCtrl, logoutCtrl, registerCtrl } from '../controllers/auth.ctrl';
import { loginLimiterMW, registerLimiterMW } from '../middlewares/rateLimiter.mw';

const router = Router();
/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User login
 *     description: Log in a user with email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *     responses:
 *       200:
 *         description: Successfully logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged in successfully
 *       400:
 *         description: Email and password are required.
 *       401:
 *         description: Invalid credentials.
 *       429:
 *         description: Too Many Requests.
 */
router.post('/login', loginLimiterMW, loginCtrl);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Logout
 *     description: Logs out the currently authenticated user.
 *     responses:
 *       200:
 *         description: Successfully logged out.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged out successfully
 *       500:
 *         description: Server error occurred during logout.
 */
router.get('/logout', logoutCtrl);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     description: Creates a new user account and logs them in.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: The unique ID of the registered user.
 *                   example: 64aefc6d12345abcd67890ef
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *       400:
 *         description: Email and password are required.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email and password are required
 *       409:
 *         description: Email already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email already exists, please register with a different email
 *       500:
 *         description: Internal server error during registration.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registration failed, Duplicate key error
 */
router.post('/register', registerLimiterMW, registerCtrl);

export default router;
