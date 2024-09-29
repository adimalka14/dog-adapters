import { UserModel } from '../models/user.model';
import { hashPassword } from '../utils/helpers';
import { IUser } from '../interfaces/user.interface';

export async function getUserById(id: string): Promise<IUser | undefined> {
    return undefined;
}

export async function getUserByEmail(
    username: string
): Promise<IUser | undefined> {
    return undefined;
}

export async function createUser(
    username: string,
    email: string,
    password: string
): Promise<IUser | undefined> {
    return await new UserModel({
        username,
        email,
        password,
        isActive: true,
    }).save();
}

export async function deleteUser(username: string): Promise<void> {}
