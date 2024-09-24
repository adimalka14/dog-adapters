const router = require('express').Router();
const {
    validateDogBodyMW,
    requiredDogBodyFieldMW,
} = require('../middlewares/dog.mw');
const {
    getDogByIdCtrl,
    getFilteredDogsListByParamsCtrl,
    addNewDogCtrl,
    updateDogDetailsCtrl,
    deleteDogCtrl,
} = require('../controllers/dog.ctrl');

router.get('/:id', getDogByIdCtrl);

router.get('/', getFilteredDogsListByParamsCtrl);

router.post('/', validateDogBodyMW, requiredDogBodyFieldMW, addNewDogCtrl);

router.put('/:id', validateDogBodyMW, updateDogDetailsCtrl);

router.delete('/:id', deleteDogCtrl);

module.exports = router;
