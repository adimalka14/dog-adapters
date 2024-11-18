import { Request, Response, NextFunction } from 'express';
import { IDog, IDogQuery } from '../interfaces/dog.interface';
import { getDogByID, filterDogs, createNewDog, updateDogInDB, deleteDogByID } from '../services/dog.service';

export async function getDogByIdCtrl(req: Request, res: Response, next: NextFunction): Promise<void> {
    const dog = await getDogByID(req.params.id);

    if (dog) {
        res.status(200).json(dog);
    } else {
        res.status(404).json({ message: 'Dog not Found' });
    }
}

export async function getFilteredDogsListByParamsCtrl(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const filteredDogs = await filterDogs(req.queryFilters as IDogQuery);

        res.status(200).json(filteredDogs);
    } catch (error) {
        next(error);
    }
}

export async function createNewDogCtrl(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const newDog: IDog = {
            race: req.body.race ?? 'unknown',
            gender: req.body.gender,
            age: parseInt(req.body.age),
            vaccines: parseInt(req.body.vaccines) ?? 0,
            behave: req.body.behave ?? [],
            name: req.body.name ?? '',
            status: 'available',
        } as IDog; // to ignore undefined params

        const dog = (await createNewDog(newDog)) as unknown as IDog;

        res.status(201).json(dog);
    } catch (error) {
        next(error);
    }
}

export async function updateDogDetailsCtrl(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const dogId = req.params.id;

        const updatedDogData: Partial<IDog> = {
            ...(req.body.race !== undefined && { race: req.body.race }),
            ...(req.body.gender !== undefined && { gender: req.body.gender }),
            ...(req.body.age !== undefined && { age: parseInt(req.body.age) }),
            ...(req.body.vaccines !== undefined && { vaccines: parseInt(req.body.vaccines) }),
            ...(req.body.behave !== undefined && { behave: req.body.behave }),
            ...(req.body.name !== undefined && { name: req.body.name }),
            ...(req.body.status !== undefined && { status: req.body.status }),
        };

        const result = await updateDogInDB(dogId, updatedDogData);

        if (result === null) {
            res.status(404).json({ message: 'Dog not found' });
        } else {
            res.status(200).json(result as unknown as IDog);
        }
    } catch (error) {
        next(error);
    }
}

export async function deleteDogCtrl(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const isDeleted = await deleteDogByID(req.params.id);
        isDeleted
            ? res.status(200).json({ message: 'Dog deleted successfully' })
            : res.status(404).json({ message: 'Dog not Found' });
    } catch (error) {
        next(error);
    }
}
