import { IDog } from '../interfaces/dog.interface';
import { DogModel } from '../models/dog.model';

export const getDogByID = async (id: string): Promise<IDog | null> => {
    const dog = await DogModel.findById(id).lean();
    return dog ? (dog as IDog) : null;
};

export const filterDogs = async (params: IDog): Promise<IDog[]> => {
    // todo
    return new Array<IDog>();
};

export const createNewDog = async (newDog: IDog): Promise<IDog | null> => {
    return await new DogModel(newDog).save();
};

export const updateDogInDB = async (dogId: string, details: Partial<IDog>): Promise<IDog | null> => {
    return DogModel.findByIdAndUpdate(dogId, { $set: details }, { new: true });
};

export const deleteDogByID = async (dogId: string): Promise<boolean> => {
    return (await DogModel.findByIdAndDelete(dogId)) !== null;
};
