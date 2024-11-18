import { Router } from 'express';
import { ensureAuthenticatedMW } from '../middlewares/authentication.mw';
import { getUserDetailsCtrl, updateUserDetailsCtrl, deleteUserCtrl } from '../controllers/users.ctrl';

const router = Router();
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users CRUD
 *     summary: Get user details
 *     description: Retrieve the details of a specific user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 64bfe6c7a1f3b2a6d7f0e8c9
 *         description: The ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 first_name:
 *                   type: string
 *                   example: John
 *                 last_name:
 *                   type: string
 *                   example: Doe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *                 id:
 *                   type: string
 *                   example: 64bfe6c7a1f3b2a6d7f0e8c9
 *                 gender:
 *                   type: string
 *                   example: male
 *       401:
 *         description: Unauthorized. The user is not logged in.
 *       404:
 *         description: User not found.
 */
router.get('/:id', ensureAuthenticatedMW, getUserDetailsCtrl);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *       - Users CRUD
 *     summary: Update user details
 *     description: Update the details of a specific user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 64bfe6c7a1f3b2a6d7f0e8c9
 *         description: The ID of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successfully updated user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   example: 64bfe6c7a1f3b2a6d7f0e8c9
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *       401:
 *         description: Unauthorized. The user is not logged in.
 *       500:
 *         description: Internal server error.
 */
router.put('/:id', ensureAuthenticatedMW, updateUserDetailsCtrl);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *       - Users CRUD
 *     summary: Delete user
 *     description: Delete a specific user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 64bfe6c7a1f3b2a6d7f0e8c9
 *         description: The ID of the user to delete.
 *     responses:
 *       200:
 *         description: Successfully deleted the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *       401:
 *         description: Unauthorized. The user is not logged in.
 *       404:
 *         description: User not found.
 */
router.delete('/:id', ensureAuthenticatedMW, deleteUserCtrl);

export default router;
