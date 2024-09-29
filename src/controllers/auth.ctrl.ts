import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { hashPassword } from '../utils/hashingPassword';
import { getUserByEmail } from '../services/user.service';
import { IUser } from '../interfaces/user.interface';

export const loginCtrl = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body as IUser;

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: 'Email and password are required' });
    }

    passport.authenticate('local', (err, user: IUser, info: any) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: info.message });

        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.json({ message: 'Logged in successfully', user });
        });
    })(req, res, next);
};

export const logoutCtrl = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    req.logout((err) => {
        if (err) return next(err);
        res.json({ message: 'Logged out successfully' });
    });
};

export const registerCtrl = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { first_name, last_name, email, gender, password } =
        req.body as IUser;

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: 'Email and password are required' });
    }

    const userExist = await getUserByEmail(email);

    if (userExist) {
        return res.status(409).json({
            message:
                'User already exists, please register with a different email',
        });
    }

    const hashedPassword = await hashPassword(password);
    const newUser: IUser = {
        first_name: first_name || '',
        last_name: last_name || '',
        email,
        gender: gender || '',
        password: hashedPassword,
    };

    req.logIn(newUser, (err) => {
        if (err) {
            return next(err);
        }
        return res
            .status(201)
            .json({ message: 'User registered successfully' });
    });
};
