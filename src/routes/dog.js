const router = require('express').Router();
const { validateDogBody, requiredDogBodyField } = require('../middlewares/dog');
const {
    getDogById,
    getFilteredDogsListByParams,
    addNewDog,
    updateDogDetails,
    deleteDog,
} = require('.././controllers/dog');

router.get('/:id', getDogById);

router.get('/', getFilteredDogsListByParams);

router.post('/', validateDogBody, requiredDogBodyField, addNewDog);

router.put('/:id', validateDogBody, updateDogDetails);

router.delete('/:id', deleteDog);

module.exports = router;
