import session from 'express-session';

const sessionOptions: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // Set to true if using HTTPS in production
    },
};

export default session(sessionOptions);
