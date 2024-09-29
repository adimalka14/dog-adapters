import { Router } from 'express';
import { ensureAuthenticatedMW } from '../middlewares/authentication.mw';
import {
    getUserDetails,
    updateUserDetails,
    deleteUser,
} from '../controllers/users.ctrl';

const router = Router();

router.get('/:id', ensureAuthenticatedMW, getUserDetails);

router.put('/:id', ensureAuthenticatedMW, updateUserDetails);

router.delete('/:id', ensureAuthenticatedMW, deleteUser);

export default router;
