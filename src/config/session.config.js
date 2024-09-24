const session = require('express-session');

const sessionOptions = {
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
    },
};

module.exports = session(sessionOptions);
