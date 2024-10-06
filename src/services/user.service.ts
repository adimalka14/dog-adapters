import { UserModel } from '../models/user.model';
import { IUser } from '../interfaces/user.interface';

export async function getUserById(id: string): Promise<IUser | null> {
    return UserModel.findById(id);
}

export async function getUserByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email });
}

export async function createUser(newUser: IUser): Promise<IUser | null> {
    return await new UserModel({ ...newUser, isActive: true }).save();
}

export async function deleteUser(id: string): Promise<boolean> {
    return (await UserModel.findByIdAndDelete(id)) !== null;
}

export async function updateUserDetails(id: string, details: Partial<IUser>): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(id, { $set: details }, { new: true });
}
