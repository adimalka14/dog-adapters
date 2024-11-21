import request, { Agent } from 'supertest';
import app from '../../app';
import { UserModel } from '../../models/user.model';
import { IUser } from '../../interfaces/user.interface';

describe('users', () => {
    let user: IUser;
    let agent: Agent;

    beforeEach(async () => {
        const uniqueSuffix = Math.random().toString(36).substring(2, 15);
        const details = {
            first_name: `yoyo_`,
            last_name: `gogo_`,
            gender: 'Male',
            email: `user_${uniqueSuffix}@test.com`,
            password: '1234',
        };

        user = (await new UserModel(details).save()) as unknown as IUser;

        agent = request.agent(app);

        await agent.post('/auth/login').send({ email: details.email, password: details.password }).expect(200);
    });

    afterEach(async () => {
        await UserModel.findByIdAndDelete(user._id);
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
                .get(`/users/111111111111111111111111`)
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

                    const updatedUser = (await UserModel.findById(user._id)) as IUser;
                    expect(updatedUser?.first_name).toBe('yoyo-change');
                    expect(updatedUser?.last_name).toBe('gogo-change');
                    expect(updatedUser?.gender).toBe('Female');
                    expect(updatedUser?.email).toBe('1234-change@test.com');

                    await UserModel.findByIdAndUpdate(user._id, { email: user.email });

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
            agent
                .delete(`/users/${user._id}`)
                .expect(200)
                .end(async (err, res) => {
                    const response = JSON.parse(res.text);
                    expect(response).toHaveProperty('message', `User deleted successfully`);

                    const deletedUser = (await UserModel.findById(user._id)) as IUser;
                    expect(deletedUser?.isActive).toBeFalsy();

                    done();
                });
        });
    });
});
