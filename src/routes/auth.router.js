const router = require('express').Router();
const {
    loginCtrl,
    logoutCtrl,
    registerCtrl,
} = require('../controllers/auth.ctrl');
const {
    loginLimiterMW,
    registerLimiterMW,
} = require('../middlewares/rateLimiter.mw');

router.post('/login', loginLimiterMW, loginCtrl);

router.get('/logout', logoutCtrl);

router.post('/register', registerLimiterMW, registerCtrl);

module.exports = router;
