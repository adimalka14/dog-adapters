import { Router } from 'express';
import { validateDogBodyMW, requiredDogBodyFieldMW, validateAndConvertQueryMW } from '../middlewares/dog.mw';
import {
    getDogByIdCtrl,
    getFilteredDogsListByParamsCtrl,
    createNewDogCtrl,
    updateDogDetailsCtrl,
    deleteDogCtrl,
} from '../controllers/dog.ctrl';
import { ensureAuthenticatedMW } from '../middlewares/authentication.mw';

const router = Router();

/**
 * @swagger
 * /dog/{id}:
 *   get:
 *     tags:
 *       - Dogs CRUD
 *     summary: Get dog by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 6731fd95cd7f7a988d615298
 *     responses:
 *       200:
 *         description: Successfully retrieved dog.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dog'
 *       404:
 *         description: Dog not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:id', getDogByIdCtrl);

/**
 * @swagger
 * /dog:
 *   get:
 *     tags:
 *       - Dogs CRUD
 *     summary: Get filtered list of dogs with pagination
 *     description: Retrieve a filtered list of dogs along with pagination details.
 *     parameters:
 *       - in: query
 *         name: race
 *         schema:
 *           type: string
 *           example: Bulldog
 *         description: Filter by dog race.
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *           example: male
 *         description: Filter by dog gender.
 *       - in: query
 *         name: minAge
 *         schema:
 *           type: number
 *           example: 1
 *         description: Minimum age of the dog.
 *       - in: query
 *         name: maxAge
 *         schema:
 *           type: number
 *           example: 10
 *         description: Maximum age of the dog.
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           example: 1
 *         description: The page number to retrieve.
 *       - in: query
 *         name: itemsPerPage
 *         schema:
 *           type: number
 *           example: 10
 *         description: Number of items per page.
 *     responses:
 *       200:
 *         description: Successfully retrieved filtered list of dogs with pagination.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Dog'
 *       400:
 *         description: Bad request (e.g., invalid query parameters).
 *       500:
 *         description: Internal server error.
 */
router.get('/', validateAndConvertQueryMW, getFilteredDogsListByParamsCtrl);

/**
 * @swagger
 * /dog:
 *   post:
 *     tags:
 *       - Dogs CRUD
 *     summary: Create a new dog
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dog'
 *     responses:
 *       201:
 *         description: Successfully created a new dog.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dog'
 *       400:
 *         description: Invalid request body.
 *       500:
 *         description: Internal server error.
 */
router.post('/', ensureAuthenticatedMW, validateDogBodyMW, requiredDogBodyFieldMW, createNewDogCtrl);

/**
 * @swagger
 * /dog/{id}:
 *   put:
 *     tags:
 *       - Dogs CRUD
 *     summary: Update dog details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 64bfe6c7a1f3b2a6d7f0e8c9
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dog'
 *     responses:
 *       200:
 *         description: Successfully updated dog details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dog'
 *       404:
 *         description: Dog not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/:id', ensureAuthenticatedMW, validateDogBodyMW, updateDogDetailsCtrl);

/**
 * @swagger
 * /dog/{id}:
 *   delete:
 *     tags:
 *       - Dogs CRUD
 *     summary: Delete a dog
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 64bfe6c7a1f3b2a6d7f0e8c9
 *     responses:
 *       200:
 *         description: Successfully deleted the dog.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Dog deleted successfully
 *       404:
 *         description: Dog not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:id', ensureAuthenticatedMW, deleteDogCtrl);

export default router;
