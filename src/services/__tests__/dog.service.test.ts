import { getDogByID, filterDogs, createNewDog, updateDogInDB, deleteDogByID } from '../dog.service';
import { DogModel } from '../../models/dog.model';

describe('DogService', () => {
    beforeEach(async () => {
        await DogModel.deleteMany({});
    });

    afterEach(async () => {
        await DogModel.deleteMany({});
    });

    test('getDogByID - should retrieve a dog by ID', async () => {
        const uniqueSuffix = Math.random().toString(36).substring(2, 15);
        const dogData = {
            race: 'Labrador',
            gender: 'Male',
            age: 3,
            vaccines: 2,
            behave: ['Friendly'],
            name: `Buddy_${uniqueSuffix}`,
            status: 'Available',
        };
        const createdDog = await new DogModel(dogData).save();

        const foundDog = await getDogByID(createdDog._id.toString());
        expect(foundDog).not.toBeNull();
        expect(foundDog?.name).toBe(dogData.name);
    });

    test('createNewDog - should create a new dog', async () => {
        const uniqueSuffix = Math.random().toString(36).substring(2, 15);
        const dogData = {
            race: 'Golden Retriever',
            gender: 'Female',
            age: 1,
            vaccines: 0,
            behave: ['Playful'],
            name: `Bella_${uniqueSuffix}`,
            status: 'Available',
        };

        const newDog = await createNewDog(dogData);
        expect(newDog).not.toBeNull();
        expect(newDog?.name).toBe(dogData.name);
    });

    test("updateDogInDB - should update an existing dog's details", async () => {
        const uniqueSuffix = Math.random().toString(36).substring(2, 15);
        const dogData = {
            race: 'Husky',
            gender: 'Male',
            age: 4,
            vaccines: 3,
            behave: ['Energetic'],
            name: `Rocky_${uniqueSuffix}`,
            status: 'Available',
        };
        const createdDog = await new DogModel(dogData).save();

        const updatedDetails = { name: `Rocky Updated_${uniqueSuffix}`, age: 5 };
        const updatedDog = await updateDogInDB(createdDog._id.toString(), updatedDetails);

        expect(updatedDog).not.toBeNull();
        expect(updatedDog?.name).toBe(updatedDetails.name);
        expect(updatedDog?.age).toBe(updatedDetails.age);
    });

    test('deleteDogByID - should delete a dog by ID', async () => {
        const uniqueSuffix = Math.random().toString(36).substring(2, 15);
        const dogData = {
            race: 'Poodle',
            gender: 'Female',
            age: 6,
            vaccines: 2,
            behave: ['Gentle'],
            name: `Daisy_${uniqueSuffix}`,
            status: 'Available',
        };
        const createdDog = await new DogModel(dogData).save();

        const deleteResult = await deleteDogByID(createdDog._id.toString());
        expect(deleteResult).toBe(true);

        const foundDog = await getDogByID(createdDog._id.toString());
        expect(foundDog).toBeNull();
    });
});
