import { Request, Response, NextFunction } from 'express';
import { validate as uuidValidate } from 'uuid';

export function validateDogBodyMW(req: Request, res: Response, next: NextFunction): void {
    let { id, race, gender, age, vaccines, behave, image, name, status } = req.body;

    if (id !== undefined && !uuidValidate(id)) {
        res.status(400).json({ message: 'Invalid or missing id' });
        return;
    }

    if (!race || typeof race !== 'string') {
        res.status(400).json({ message: 'Invalid or missing race' });
        return;
    }

    if (!gender || !['male', 'female'].includes(gender.toLowerCase())) {
        res.status(400).json({ message: 'Invalid or missing gender' });
        return;
    }

    req.body.gender = gender.toLowerCase();

    if (age === undefined || typeof age !== 'number' || age <= 0) {
        res.status(400).json({ message: 'Invalid or missing age' });
        return;
    }

    if (vaccines === undefined || typeof vaccines !== 'number' || vaccines < 0) {
        res.status(400).json({ message: 'Invalid or missing vaccines' });
        return;
    }

    if (!Array.isArray(behave) || behave.some((b) => typeof b !== 'string')) {
        res.status(400).json({ message: 'Invalid or missing behave' });
        return;
    }

    if (!name || typeof name !== 'string') {
        res.status(400).json({ message: 'Invalid or missing name' });
        return;
    }

    if (!status || !['available', 'adopted', 'pending'].includes(status.toLowerCase())) {
        res.status(400).json({ message: 'Invalid or missing status' });
        return;
    }

    req.body.status = status.toLowerCase();

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
