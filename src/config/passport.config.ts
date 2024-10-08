import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { getUserByEmail } from '../services/user.service';
import { comparePasswords } from '../utils/hashingPassword';
import { IUser } from '../interfaces/user.interface';

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email: string, password: string, done) => {
            try {
                const user: IUser | null = await getUserByEmail(email);

                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }

                const isMatch = await comparePasswords(password, user.password);
                if (!isMatch) {
                    return done(null, false, { message: 'Incorrect password' });
                }

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, (user as IUser).email);
});

passport.deserializeUser(async (email: string, done) => {
    try {
        const user = await getUserByEmail(email);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

export default passport;
