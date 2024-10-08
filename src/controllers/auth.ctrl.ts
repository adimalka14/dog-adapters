import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { hashPassword } from '../utils/hashingPassword';
import { createUser, getUserByEmail } from '../services/user.service';
import { IUser } from '../interfaces/user.interface';

export const loginCtrl = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as IUser;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    passport.authenticate('local', (err: Error, user: IUser, info: any) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: info.message });

        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.json({ userId: user._id, message: 'Logged in successfully' });
        });
    })(req, res, next);
};

export const logoutCtrl = async (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
        if (err) return next(err);
        res.json({ message: 'Logged out successfully' });
    });
};

export const registerCtrl = async (req: Request, res: Response, next: NextFunction) => {
    const { first_name, last_name, email, gender, password } = req.body as IUser;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const hashedPassword = await hashPassword(password);
    const newUser: Partial<IUser> = {
        first_name: first_name || '',
        last_name: last_name || '',
        email,
        gender: gender || '',
        password: hashedPassword,
    };

    try {
        const result = await createUser(newUser);

        req.logIn(result as IUser, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(201).json({ userid: result?._id, message: 'User registered successfully' });
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({ message: 'Email already exists, please register with a different email' });
        }
        return res.status(500).json({ message: `User registration failed, ${err.message}` });
    }
};
