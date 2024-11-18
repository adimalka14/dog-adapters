import request, { Agent } from 'supertest';
import app from '../../app';
import { UserModel } from '../../models/user.model';
import { IUser } from '../../interfaces/user.interface';

describe('users', () => {
    let user: IUser;
    let agent: Agent;

    beforeAll(async () => {
        await UserModel.deleteMany({});

        const details = {
            first_name: 'yoyo',
            last_name: 'gogo',
            gender: 'Male',
            email: '1234@test.com',
            password: '1234',
        };
        user = (await new UserModel(details).save()) as unknown as IUser;

        agent = request.agent(app);

        await agent.post('/auth/login').send({ email: details.email, password: details.password }).expect(200);
    });

    afterAll(async () => {
        await UserModel.findByIdAndDelete(user._id);
        //await UserModel.deleteMany({});
    });

    describe(`GET users/:id`, () => {
        it('get user details - failed Unauthorized', (done) => {
            request(app)
                .get(`/users/${user._id}`)
                .expect(401)
                .end((err, res) => {
                    const response = JSON.parse(res.text);
                    expect(response).toHaveProperty('message', `Unauthorized, please log in`);
                    done();
                });
        });

        it('get user details successfully', (done) => {
            agent
                .get(`/users/${user._id}`)
                .expect(200)
                .end((err, res) => {
                    const response = JSON.parse(res.text);
                    expect(response).toHaveProperty('id', `${user._id}`);
                    done();
                });
        });

        it('get user details - failed id is not exist.', (done) => {
            agent
                .get(`/users/11111111111111`) //
                .expect(404)
                .end((err, res) => {
                    const response = JSON.parse(res.text);
                    expect(response).toHaveProperty('message', `User not found`);
                    done();
                });
        });
    });

    describe(`PUT users/:id`, () => {
        it('put user details - failed Unauthorized', (done) => {
            request(app)
                .put(`/users/${user._id}`)
                .send({
                    first_name: 'yoyo-change',
                    last_name: 'gogo-change',
                    gender: 'Female',
                    email: '1234-change@test.com',
                })
                .expect(401)
                .end((err, res) => {
                    const response = JSON.parse(res.text);
                    expect(response).toHaveProperty('message', `Unauthorized, please log in`);
                    done();
                });
        });

        it('put user details successfully', (done) => {
            agent
                .put(`/users/${user._id}`)
                .send({
                    first_name: 'yoyo-change',
                    last_name: 'gogo-change',
                    gender: 'Female',
                    email: '1234-change@test.com',
                })
                .expect(200)
                .end(async (err, res) => {
                    const response = JSON.parse(res.text);
                    expect(response).toHaveProperty('message', `User updated successfully`);
                    const newDetails = (await UserModel.findById(user._id)) as unknown as IUser;
                    expect(newDetails.first_name).toBe('yoyo-change');
                    expect(newDetails.last_name).toBe('gogo-change');
                    expect(newDetails.gender).toBe('Female');
                    expect(newDetails.email).toBe('1234-change@test.com');

                    await UserModel.findByIdAndUpdate(user._id, { email: '1234@test.com' });

                    done();
                });
        });
    });

    describe(`DELETE users/:id`, () => {
        it('delete user details - failed Unauthorized', (done) => {
            request(app)
                .delete(`/users/${user._id}`)
                .expect(401)
                .end((err, res) => {
                    const response = JSON.parse(res.text);
                    expect(response).toHaveProperty('message', `Unauthorized, please log in`);
                    done();
                });
        });

        it('delete user details successfully', (done) => {
            expect(user.isActive).toBeTruthy();
            agent
                .delete(`/users/${user._id}`)
                .expect(200)
                .end(async (err, res) => {
                    const response = JSON.parse(res.text);
                    expect(response).toHaveProperty('message', `User deleted successfully`);
                    const newDetails = (await UserModel.findById(user._id)) as unknown as IUser;
                    expect(newDetails.isActive).toBeFalsy();
                    done();
                });
        });
    });
});
