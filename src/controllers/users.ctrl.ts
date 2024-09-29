import { Request, Response, NextFunction } from 'express';
import { IUser } from '../interfaces/user.interface';
import { getUserById } from '../services/user.service';

export const getUserDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const userId = req.params.id;
    const user = await getUserById(userId);
    if (user) {
        res.status(200).json({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            //id: user.id,
            gender: user.gender,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

export const updateUserDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId = req.params.id;

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId = req.params.id;

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};
