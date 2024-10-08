import { IDog, IDogQuery } from '../interfaces/dog.interface';
import { DogModel } from '../models/dog.model';
import { filterDogsAggregation } from '../aggregations/filterDogs.aggregations';
import { PipelineStage } from 'mongoose';

export const getDogByID = async (id: string): Promise<IDog | null> => {
    const dog = await DogModel.findById(id).lean();
    return dog ? (dog as IDog) : null;
};

interface IPagination {
    page: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
}

interface IFilterResult {
    pagination: IPagination;
    data: IDog[];
}

export const filterDogs = async (params: IDogQuery): Promise<IFilterResult> => {
    const { page = 1, itemsPerPage = 10 } = params;
    const aggregation: PipelineStage[] = filterDogsAggregation(params);
    const results: any = await DogModel.aggregate(aggregation);
    // todo
    if (!Array.isArray(results) || results.length === 0) {
        return {
            pagination: { page, totalItems: 0, itemsPerPage, totalPages: 0 },
            data: [],
        };
    }

    const result = results[0];

    const pagination = result.pagination[0] || {
        page,
        totalItems: 0,
        itemsPerPage,
        totalPages: 0,
    };

    const data = result.data || [];

    return { pagination, data };
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
