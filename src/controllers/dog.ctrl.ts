import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { IDog } from '../interfaces/dog.interface';
import { findDogByID, filterDogs, insertNewDog } from '../services/dog.service';

export async function getDogByIdCtrl(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const dogId = req.params.id;

    const dog = await findDogByID(dogId);

    if (dog) {
        res.status(200).json(dog);
    } else {
        res.status(404).json({ message: 'Dog not Found' });
    }
}

export async function getFilteredDogsListByParamsCtrl(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const dogParams: IDog = {
            id: (req.query.id as string) ?? undefined,
            race: (req.query.race as string) ?? undefined,
            gender: (req.query.gender as string) ?? undefined,
            age: req.query.age ? parseInt(req.query.age as string) : undefined,
            vaccines: req.query.vaccines
                ? parseInt(req.query.vaccines as string)
                : undefined,
            behave: req.query.behave
                ? (req.query.behave as string).split(',')
                : undefined,
            name: (req.query.name as string) ?? undefined,
            status: (req.query.status as string) ?? undefined,
        };

        const filteredDogs: IDog[] = await filterDogs(dogParams);

        res.status(200).json(filteredDogs);
    } catch (error) {
        next(error);
    }
}

export async function addNewDogCtrl(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const newDog: IDog = {
            id: uuidv4(),
            race: req.body.race ?? undefined,
            gender: req.body.gender ?? undefined,
            age: req.body.age ? parseInt(req.body.age) : undefined,
            vaccines: req.body.vaccines
                ? parseInt(req.body.vaccines)
                : undefined,
            behave: req.body.behave ?? undefined,
            name: req.body.name ?? undefined,
            status: req.body.status ?? undefined,
        };

        await insertNewDog(newDog);

        res.status(201).json(newDog);
    } catch (error) {
        next(error);
    }
}

export async function updateDogDetailsCtrl(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const dogId = req.params.id;

        res.status(200).json({ message: 'Dog updated' });
    } catch (error) {
        next(error);
    }
}

export async function deleteDogCtrl(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const dogId = req.params.id;

        res.status(200).json({ message: 'Dog deleted successfully' });
    } catch (error) {
        next(error);
    }
}
