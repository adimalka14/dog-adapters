import { Request, Response, NextFunction } from 'express';
import { IUser } from '../interfaces/user.interface';
import { deleteUser, getUserById, updateUserDetails } from '../services/user.service';
import { IDog } from '../interfaces/dog.interface';

export const getUserDetailsCtrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId: string = req.params.id;
        const user: IUser = (await getUserById(userId)) as IUser;
        res.status(200).json({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            id: userId,
            gender: user.gender,
        });
    } catch (err: any) {
        res.status(404).json({ message: 'User not found' });
    }
};

export const updateUserDetailsCtrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const updatedUserData: Partial<IUser> = {
            ...(req.body.first_name !== undefined && { first_name: req.body.first_name }),
            ...(req.body.last_name !== undefined && { last_name: req.body.last_name }),
            ...(req.body.email !== undefined && { email: req.body.email }),
            ...(req.body.gender !== undefined && { gender: req.body.gender }),
            ...(req.body.password !== undefined && { password: req.body.password }),
        };

        const result = await updateUserDetails(req.params.id, updatedUserData);
        res.status(200).json({ userId: result?._id, message: 'User updated successfully' });
    } catch (error: any) {
        next(error.message);
    }
};

export const deleteUserCtrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const isDeleted = await deleteUser(req.params.id);

        isDeleted
            ? res.status(200).json({ message: 'User deleted successfully' })
            : res.status(404).json({ message: 'User not Found' });
    } catch (error) {
        next(error);
    }
};
