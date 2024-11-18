import { Request, Response, NextFunction, query } from 'express';
import { validate as uuidValidate } from 'uuid';
import { IDog, IDogQuery } from '../interfaces/dog.interface';

export function validateDogBodyMW(req: Request, res: Response, next: NextFunction): void {
    const { id, race, gender, age, vaccines, behave, name, status } = req.body;

    if (id !== undefined && !uuidValidate(id)) {
        res.status(400).json({ message: 'Invalid id' });
        return;
    }

    if (race !== undefined && typeof race !== 'string') {
        res.status(400).json({ message: 'Invalid race' });
        return;
    }

    if (gender !== undefined) {
        if (typeof gender !== 'string' || !['male', 'female'].includes(gender.toLowerCase())) {
            res.status(400).json({ message: 'Invalid gender' });
            return;
        }
        req.body.gender = gender.toLowerCase();
    }

    if (age !== undefined && (typeof age !== 'number' || age <= 0)) {
        res.status(400).json({ message: 'Invalid age' });
        return;
    }

    if (vaccines !== undefined && (typeof vaccines !== 'number' || vaccines < 0)) {
        res.status(400).json({ message: 'Invalid vaccines' });
        return;
    }

    if (behave !== undefined && (!Array.isArray(behave) || behave.some((b) => typeof b !== 'string'))) {
        res.status(400).json({ message: 'Invalid behave' });
        return;
    }

    if (name !== undefined && typeof name !== 'string') {
        res.status(400).json({ message: 'Invalid name' });
        return;
    }

    if (status !== undefined) {
        if (typeof status !== 'string' || !['available', 'adopted', 'pending'].includes(status.toLowerCase())) {
            res.status(400).json({ message: 'Invalid status' });
            return;
        }
        req.body.status = status.toLowerCase();
    }

    next();
}

export function requiredDogBodyFieldMW(req: Request, res: Response, next: NextFunction): void {
    const { gender, age } = req.body;

    if (!gender || !['male', 'female'].includes(gender.toLowerCase())) {
        res.status(400).json({
            message: 'Gender is required and must be Male or Female',
        });
        return;
    }

    if (age === undefined || typeof age !== 'number' || age <= 0) {
        res.status(400).json({
            message: 'Age is required and must be a positive number',
        });
        return;
    }

    next();
}

export function validateAndConvertQueryMW(req: Request, res: Response, next: NextFunction): void {
    const dogParams: IDogQuery = {
        ...(req.query.race !== undefined && { race: req.query.race as string }),
        ...(req.query.gender !== undefined && { gender: req.query.gender as string }),
        ...(req.query.minAge !== undefined && { minAge: parseInt(req.query.minAge as string) }),
        ...(req.query.maxAge !== undefined && { maxAge: parseInt(req.query.maxAge as string) }),
        ...(req.query.name !== undefined && { name: req.query.name as string }),
        ...(req.query.status !== undefined && { status: req.query.status as string }),
        page: req.query.page !== undefined ? parseInt(req.query.page as string) : 1,
        itemsPerPage: req.query.itemsPerPage !== undefined ? parseInt(req.query.itemsPerPage as string) : 10,
    } as IDogQuery;

    if (Number.isNaN(dogParams.page) || dogParams.page! <= 0) {
        return next('Invalid page');
    }

    if (Number.isNaN(dogParams.itemsPerPage) || dogParams.itemsPerPage! <= 0 || dogParams.itemsPerPage! > 100) {
        return next('items per page must be max 100');
    }

    if (Number.isNaN(dogParams.minAge)) return next('minAge must be a positive number');
    if (Number.isNaN(dogParams.maxAge)) return next('maxAge must be a positive number');

    req.queryFilters = dogParams;
    next();
}
