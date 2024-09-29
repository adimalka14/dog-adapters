import { IDog } from '../interfaces/dog.interface';

export const findDogByID = async (id: string) => {};

export const filterDogs = async (params: IDog): Promise<IDog[]> => {};

export const insertNewDog = async (newDog: IDog): Promise<void> => {};
