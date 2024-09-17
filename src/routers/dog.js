const router = require('express').Router();
const { validateDogBody, requiredDogBodyField } = require('../middlewares/dog');
const {
    getDogById,
    getFilteredDogsListByParams,
    addNewDog,
    updateDogDetails,
    deleteDog,
} = require('.././controllers/dog');

router.get('/:dog-id', getDogById);

router.get('/', getFilteredDogsListByParams);

router.post('/', validateDogBody, requiredDogBodyField, addNewDog);

router.put('/:dogId', validateDogBody, updateDogDetails);

router.delete('/:dogId', deleteDog);

module.exports = router;
