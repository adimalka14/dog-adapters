const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { findUserByMail } = require('../models/user.model');
const { comparePasswords } = require('../utils/hashingPassword');

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            const user = await findUserByMail(email);

            if (!user) {
                return done(null, false, { message: 'User not found' });
            }

            const isMatch = await comparePasswords(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password' });
            }

            return done(null, user);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
    const user = await findUserByMail(email);
    done(null, user);
});

module.exports = passport;
