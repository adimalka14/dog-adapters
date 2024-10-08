import { Router } from 'express';
import { ensureAuthenticatedMW } from '../middlewares/authentication.mw';
import { getUserDetailsCtrl, updateUserDetailsCtrl, deleteUserCtrl } from '../controllers/users.ctrl';

const router = Router();

router.get('/:id', ensureAuthenticatedMW, getUserDetailsCtrl);

router.put('/:id', ensureAuthenticatedMW, updateUserDetailsCtrl);

router.delete('/:id', ensureAuthenticatedMW, deleteUserCtrl);

export default router;
