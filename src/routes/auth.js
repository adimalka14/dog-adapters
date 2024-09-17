const router = require('express').Router();
const { login, logout, register } = require('../controllers/auth');
const { loginLimiter, registerLimiter } = require('../config/rateLimiter');

router.post('/login', loginLimiter, login);

router.get('/logout', logout);

router.post('/register', registerLimiter, register);

module.exports = router;
