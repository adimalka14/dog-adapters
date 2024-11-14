import { getUserById, getUserByEmail, createUser, deleteUser, updateUserDetails } from '../user.service';
import { IUser } from '../../interfaces/user.interface';
import mongoose from 'mongoose';
import { UserModel } from '../../models/user.model';

describe('UserService', () => {
    beforeAll(async () => {
        await UserModel.deleteMany({});
    });

    afterAll(async () => {
        await UserModel.deleteMany({});
    });

    test('create user - good case', async () => {
        const userData = { email: 'test@gmail.com', password: '123456' };

        const res = (await createUser(userData)) as IUser;

        expect(res).toHaveProperty('email', userData.email);

        expect(res.password).not.toBe(userData.password);

        expect(res).toHaveProperty('_id');
    });

    test('create user - bad case', async () => {
        const userData = { email: 'test@gmail.com' };
        try {
            await createUser(userData);
        } catch (error) {
            const validationError = error as mongoose.Error.ValidationError;
            expect(validationError).toBeInstanceOf(mongoose.Error.ValidationError);
            expect(validationError.errors.password.message).toBe('you must provide a password');
        }
    });

    test('getUserById - should return user by ID', async () => {
        const userData = { email: 'user@example.com', password: 'password123' };
        const createdUser = await createUser(userData);

        const foundUser = await getUserById(createdUser?._id as string);
        expect(foundUser).not.toBeNull();
        expect(foundUser?.email).toBe(userData.email);
    });

    test('getUserByEmail - should return user by email', async () => {
        const userData = { email: 'findme@example.com', password: 'password123' };
        await createUser(userData);

        const foundUser = await getUserByEmail(userData.email);
        expect(foundUser).not.toBeNull();
        expect(foundUser?.email).toBe(userData.email);
    });

    test('updateUserDetails - should update user details', async () => {
        const userData = { email: 'update@example.com', password: 'password123' };
        const createdUser = await createUser(userData);

        const updatedDetails = { email: 'updated@example.com' };
        const updatedUser = await updateUserDetails(createdUser?._id as string, updatedDetails);

        expect(updatedUser).not.toBeNull();
        expect(updatedUser?.email).toBe(updatedDetails.email);
    });

    test('deleteUser - should deactivate user', async () => {
        const userData = { email: 'deactivate@example.com', password: 'password123' };
        const createdUser = await createUser(userData);

        const deleteResult = await deleteUser(createdUser?._id as string);
        expect(deleteResult).toBe(true);

        const foundUser = await getUserById(createdUser?._id as string);
        expect(foundUser?.isActive).toBe(false);
    });
});
