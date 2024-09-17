const rateLimit = require('express-rate-limit');

const hour = 60 * 60 * 1000;
const minute = 60 * 1000;

const generalLimiter = rateLimit({
    windowMs: 15 * minute,
    max: 200,
    message: 'Too many requests, please try again later',
});

const loginLimiter = rateLimit({
    windowMs: 15 * minute,
    max: 5,
    message: 'Too many login attempts, please try again later',
});

const registerLimiter = rateLimit({
    windowMs: hour,
    max: 3,
    message: 'Too many registration attempts, please try again later',
});

module.exports = {
    registerLimiter,
    loginLimiter,
    generalLimiter,
};
