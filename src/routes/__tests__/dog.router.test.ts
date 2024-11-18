import request, { Agent } from 'supertest';
import app from '../../app';
import { DogModel } from '../../models/dog.model';
import { UserModel } from '../../models/user.model';
import { IDog } from '../../interfaces/dog.interface';
import { IUser } from '../../interfaces/user.interface';

describe('Dog Routes', () => {
    let agent: Agent;
    let user: IUser;
    let dog: IDog | null;

    beforeAll(async () => {
        user = await new UserModel({
            email: 'testuser@example.com',
            password: 'password123',
        }).save();

        agent = request.agent(app);
        await agent.post('/auth/login').send({ email: 'testuser@example.com', password: 'password123' }).expect(200);
    });

    afterAll(async () => {
        await UserModel.findByIdAndDelete(user._id);
        if (dog && dog._id) {
            await DogModel.findByIdAndDelete(dog._id);
        }
    });

    describe('GET /dog/:id', () => {
        it('should retrieve a dog by ID', async () => {
            dog = (await new DogModel({
                race: 'Labrador',
                gender: 'male',
                age: 3,
                vaccines: 2,
                behave: ['friendly', 'playful'],
                name: 'Buddy',
                status: 'available',
            }).save()) as unknown as IDog;

            const res = await request(app).get(`/dog/${dog._id}`).expect(200);

            expect(res.body).toHaveProperty('_id', dog._id?.toString());
            expect(res.body).toHaveProperty('name', 'Buddy');

            await DogModel.findByIdAndDelete(dog._id);
        });

        it('should return 404 if dog not found', async () => {
            const nonExistentId = '111111111111111111111111';
            const res = await request(app).get(`/dog/${nonExistentId}`).expect(404);

            expect(res.body).toHaveProperty('message', 'Dog not Found');
        });
    });

    describe('GET /dog', () => {
        it('should retrieve a list of dogs with query parameters', async () => {
            const dog1 = await new DogModel({
                race: 'Labrador',
                gender: 'male',
                age: 3,
                name: 'Buddy',
                status: 'available',
            }).save();

            const dog2 = await new DogModel({
                race: 'Beagle',
                gender: 'female',
                age: 5,
                name: 'Lucy',
                status: 'adopted',
            }).save();

            const res = await request(app).get('/dog').query({ gender: 'male' }).expect(200);

            expect(Array.isArray(res.body.data)).toBeTruthy();
            expect(res.body.data.length).toBeGreaterThan(0);
            res.body.data.forEach((dog: IDog) => {
                expect(dog.gender).toBe('male');
            });

            await DogModel.findByIdAndDelete(dog1._id);
            await DogModel.findByIdAndDelete(dog2._id);
        });

        it('should return 500 for invalid query parameters', async () => {
            const res = await request(app).get('/dog').query({ minAge: 'invalid' }).expect(500);

            const errorMessageMatch = res.text.match(/<pre>(.*?)<\/pre>/);
            expect(errorMessageMatch).not.toBeNull();
            const errorMessage = errorMessageMatch![1];

            expect(errorMessage).toBe('minAge must be a positive number');
        });
    });

    describe('POST /dog', () => {
        it('should create a new dog', async () => {
            const newDogData = {
                race: 'Golden Retriever',
                gender: 'female',
                age: 2,
                vaccines: 1,
                behave: ['friendly'],
                name: 'Goldie',
                status: 'available',
            };

            const res = await agent.post('/dog').send(newDogData).expect(201);

            expect(res.body).toHaveProperty('name', 'Goldie');
            expect(res.body).toHaveProperty('_id');

            dog = res.body;
        });

        it('should return 400 for invalid dog data', async () => {
            const invalidDogData = {
                race: '',
                gender: 'unknown',
                age: -1,
                name: '',
                status: 'unknown',
            };

            const res = await agent.post('/dog').send(invalidDogData).expect(400);

            expect(res.body).toHaveProperty('message');
        });

        it('should return 401 if not authenticated', async () => {
            const newDogData = {
                race: 'Poodle',
                gender: 'female',
                age: 2,
                name: 'Puffy',
                status: 'available',
            };

            const res = await request(app).post('/dog').send(newDogData).expect(401);

            expect(res.body).toHaveProperty('message', 'Unauthorized, please log in');
        });
    });

    describe('PUT /dog/:id', () => {
        it("should update an existing dog's details", async () => {
            if (!dog || !dog._id) {
                dog = (await new DogModel({
                    race: 'Bulldog',
                    gender: 'male',
                    age: 4,
                    name: 'Bull',
                    status: 'available',
                }).save()) as unknown as IDog;
            }

            const updatedData = {
                age: 5,
                status: 'adopted',
            };

            const res = await agent.put(`/dog/${dog._id}`).send(updatedData).expect(200);

            expect(res.body).toHaveProperty('age', 5);
            expect(res.body).toHaveProperty('status', 'adopted');
        });

        it('should return 404 when updating non-existent dog', async () => {
            const nonExistentId = '111111111111111111111111';

            const res = await agent
                .put(`/dog/${nonExistentId}`) // Corrected route path
                .send({ age: 5 })
                .expect(404);

            expect(res.body).toHaveProperty('message', 'Dog not found');
        });

        it('should return 401 if not authenticated when updating', async () => {
            const res = await request(app).put(`/dog/${dog?._id}`).send({ age: 5 }).expect(401);

            expect(res.body).toHaveProperty('message', 'Unauthorized, please log in');
        });
    });

    describe('DELETE /dog/:id', () => {
        it('should delete a dog by ID', async () => {
            if (!dog || !dog._id) {
                dog = (await new DogModel({
                    race: 'Shepherd',
                    gender: 'female',
                    age: 3,
                    name: 'Shep',
                    status: 'available',
                }).save()) as unknown as IDog;
            }

            const res = await agent.delete(`/dog/${dog._id}`).expect(200);

            expect(res.body).toHaveProperty('message', 'Dog deleted successfully');

            const deletedDog = await DogModel.findById(dog._id);
            expect(deletedDog).toBeNull();

            dog = null;
        });

        it('should return 404 when deleting non-existent dog', async () => {
            const nonExistentId = '111111111111111111111111';

            const res = await agent.delete(`/dog/${nonExistentId}`).expect(404);

            expect(res.body).toHaveProperty('message', 'Dog not Found');
        });

        it('should return 401 if not authenticated when deleting', async () => {
            dog = await new DogModel({
                race: 'Dalmatian',
                gender: 'male',
                age: 2,
                name: 'Spot',
                status: 'available',
            }).save();

            const res = await request(app).delete(`/dog/${dog._id}`).expect(401);

            expect(res.body).toHaveProperty('message', 'Unauthorized, please log in');

            await DogModel.findByIdAndDelete(dog._id);
            dog = null;
        });
    });
});
