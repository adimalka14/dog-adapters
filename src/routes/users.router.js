const router = require('express').Router();
const { ensureAuthenticatedMW } = require('../middlewares/authentication.mw');
const {
    getUserDetails,
    updateUserDetails,
    deleteUser,
} = require('../controllers/users.ctrl');

router.get('/:id', ensureAuthenticatedMW, getUserDetails);

router.put('/:id', ensureAuthenticatedMW, updateUserDetails);

router.delete('/:id', ensureAuthenticatedMW, deleteUser);

module.exports = router;
