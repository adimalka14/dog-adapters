const router = require('express').Router();
const { ensureAuthenticatedMW } = require('../middlewares/authentication');
const {
    getUserDetails,
    updateUserDetails,
    deleteUser,
} = require('../controllers/users');

router.get('/:id', ensureAuthenticatedMW, getUserDetails);

router.put('/:id', ensureAuthenticatedMW, updateUserDetails);

router.delete('/:id', ensureAuthenticatedMW, deleteUser);

module.exports = router;
