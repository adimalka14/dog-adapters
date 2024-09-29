import { Router } from 'express';
import {
    validateDogBodyMW,
    requiredDogBodyFieldMW,
} from '../middlewares/dog.mw';
import {
    getDogByIdCtrl,
    getFilteredDogsListByParamsCtrl,
    addNewDogCtrl,
    updateDogDetailsCtrl,
    deleteDogCtrl,
} from '../controllers/dog.ctrl';

const router = Router();

router.get('/:id', getDogByIdCtrl);

router.get('/', getFilteredDogsListByParamsCtrl);

router.post('/', validateDogBodyMW, requiredDogBodyFieldMW, addNewDogCtrl);

router.put('/:id', validateDogBodyMW, updateDogDetailsCtrl);

router.delete('/:id', deleteDogCtrl);

export default router;
