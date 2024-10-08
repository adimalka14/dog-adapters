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

router.get('/:id', getDogByIdCtrl);

router.get('/', validateAndConvertQueryMW, getFilteredDogsListByParamsCtrl);

router.post('/', ensureAuthenticatedMW, validateDogBodyMW, requiredDogBodyFieldMW, createNewDogCtrl);

// todo add validate owner
router.put('/:id', ensureAuthenticatedMW, validateDogBodyMW, updateDogDetailsCtrl);

router.delete('/:id', ensureAuthenticatedMW, deleteDogCtrl);

export default router;
