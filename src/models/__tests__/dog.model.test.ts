import { DogModel } from '../dog.model';

describe('Dog Model Basic Tests', () => {
    test('should create a new dog with required fields', async () => {
        const dogTest = {
            race: 'Labrador',
            gender: 'Male',
            age: 3,
            vaccines: 2,
            behave: ['Friendly', 'Playful'],
            name: 'Buddy',
            status: 'Available',
        };

        const res = await new DogModel(dogTest).save();

        expect(res).toHaveProperty('race', dogTest.race);
        expect(res).toHaveProperty('name', dogTest.name);
        expect(res.behave).toContain('Friendly');
    });
});
