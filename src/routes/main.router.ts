import { Router } from 'express';
import logger from '../utils/logger';

const router = Router();
/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Main Page
 *     summary: Main page
 *     description: Returns the main page of the API.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Main page
 */
router.get('/', async (req, res) => {
    res.send('Main page');
});

export default router;
