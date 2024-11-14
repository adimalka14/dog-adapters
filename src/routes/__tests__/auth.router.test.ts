import request from 'supertest';
import app from '../../app';
import { UserModel } from '../../models/user.model';
import { IUser } from '../../interfaces/user.interface';

describe('Authentication', () => {
    let user: IUser;

    beforeAll(async () => {
        const details = { email: '12345@test.com', password: '1234' };
        user = await new UserModel(details).save();
    });

    afterAll(async () => {
        await UserModel.findByIdAndDelete(user._id);
    });

    describe('POST auth/login', () => {
        it('Response login API successfully', async () => {
            const res = await request(app)
                .post('/auth/login')
                .send({ email: user.email, password: '1234' })
                .expect(200);

            expect(res.body).toHaveProperty('message', 'Logged in successfully');
        });

        it('Response login API failed - wrong password', async () => {
            await request(app).post('/auth/login').send({ email: user.email, password: '1111' }).expect(401);
        });

        it('missing email', async () => {
            const res = await request(app).post('/auth/login').send({ password: '1234' }).expect(400);

            expect(res.body).toHaveProperty('message', 'Email and password are required');
        });

        it('missing password', async () => {
            const res = await request(app).post('/auth/login').send({ email: user.email }).expect(400);

            expect(res.body).toHaveProperty('message', 'Email and password are required');
        });
    });

    describe('GET auth/logout', () => {
        it('Response logout API successfully', async () => {
            const res = await request(app).get('/auth/logout').expect(200);

            expect(res.body).toHaveProperty('message', 'Logged out successfully');
        });
    });

    describe('POST auth/register', () => {
        it('register successfully', async () => {
            const res = await request(app)
                .post('/auth/register')
                .send({ email: 'test@test.com', password: '1111' })
                .expect(201);

            expect(res.body).toHaveProperty('message', 'User registered successfully');

            // Clean up: Delete the user created during the test
            await UserModel.findByIdAndDelete(res.body.userId);
        });

        it('User already exist', async () => {
            const res = await request(app)
                .post('/auth/register')
                .send({ email: '12345@test.com', password: '1111' })
                .expect(409);

            expect(res.body).toHaveProperty('message', 'Email already exists, please register with a different email');
        });

        it('missing email', async () => {
            const res = await request(app).post('/auth/register').send({ password: '1234' }).expect(400);

            expect(res.body).toHaveProperty('message', 'Email and password are required');
        });

        it('missing password', async () => {
            const res = await request(app).post('/auth/register').send({ email: user.email }).expect(400);

            expect(res.body).toHaveProperty('message', 'Email and password are required');
        });
    });
});
