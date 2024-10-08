import { UserModel } from '../models/user.model';
import { IUser } from '../interfaces/user.interface';

export async function getUserById(id: string): Promise<IUser | null> {
    return UserModel.findById(id);
}

export async function getUserByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email });
}

export async function createUser(newUser: Partial<IUser>): Promise<IUser | null> {
    return await new UserModel({ ...newUser }).save();
}

export async function deleteUser(id: string): Promise<boolean> {
    try {
        const result = await UserModel.findByIdAndUpdate(id, { $set: { isActive: false } });
        return result !== null;
    } catch (error) {
        console.error(`Error deleting user with id ${id}:`, error);
        return false;
    }
}

export async function updateUserDetails(id: string, details: Partial<IUser>): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(id, { $set: details }, { new: true });
}
