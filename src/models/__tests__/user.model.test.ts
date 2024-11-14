import { UserModel } from '../user.model';

describe('User Model Tests', () => {
    test('should hash password before saving user', async () => {
        const userTest = { email: 'test@test.com', password: 'test123' };
        const res = await new UserModel(userTest).save();

        expect(res).toHaveProperty('email', userTest.email);
        expect(res.password).toBeDefined();
        expect(res.password).not.toBe(userTest.password);
    });

    test('should not create a user without email', async () => {
        const userTest = { password: 'test123' };
        await expect(new UserModel(userTest).save()).rejects.toThrow('you must provide an email');
    });

    test('should not create a user without password', async () => {
        const userTest = { email: 'test@test.com' };
        await expect(new UserModel(userTest).save()).rejects.toThrow('you must provide a password');
    });

    test('should not create a user with password shorter than 4 characters', async () => {
        const userTest = { email: 'test@test.com', password: '123' };
        await expect(new UserModel(userTest).save()).rejects.toThrow();
    });

    test('should not allow creating two users with the same email', async () => {
        const userTest = { email: 'unique@test.com', password: 'test123' };
        await new UserModel(userTest).save();

        const duplicateUser = new UserModel(userTest);
        try {
            await duplicateUser.save();
        } catch (error: any) {
            expect(error.code).toBe(11000); // 11000 is the duplicate key error code in MongoDB
        }
    });

    test('should set isAdmin to false by default', async () => {
        const userTest = { email: 'test1@test.com', password: 'test123' };
        const res = await new UserModel(userTest).save();

        expect(res.isAdmin).toBe(false);
    });

    test('should hash password only when modified', async () => {
        const userTest = { email: 'test2@test.com', password: 'test123' };
        const user = await new UserModel(userTest).save();
        const originalHashedPassword = user.password;

        user.first_name = 'Updated';
        await user.save();

        expect(user.password).toBe(originalHashedPassword); // הסיסמה נשארה זהה
    });

    test('should set isActive to true by default', async () => {
        const userTest = { email: 'test3@test.com', password: 'test123' };
        const res = await new UserModel(userTest).save();

        expect(res.isActive).toBe(true);
    });

    test('should hash the password before saving', async () => {
        const userTest = { email: 'hash@test.com', password: 'plainpassword' };
        const res = await new UserModel(userTest).save();

        expect(res.password).not.toBe('plainpassword');
    });
});
