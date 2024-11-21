import { Request, Response, NextFunction } from 'express';
import { validateDogBodyMW, requiredDogBodyFieldMW, validateAndConvertQueryMW } from '../dog.mw';

describe('Dog Middleware', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: jest.Mock;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    describe('validateDogBodyMW', () => {
        it('should pass valid body', () => {
            req.body = {
                id: '550e8400-e29b-41d4-a716-446655440000',
                race: 'Labrador',
                gender: 'male',
                age: 3,
                vaccines: 2,
                behave: ['friendly'],
                name: 'Buddy',
                status: 'available',
            };

            validateDogBodyMW(req as Request, res as Response, next);

            expect(next).toHaveBeenCalled();
        });

        it('should return error for invalid id', () => {
            req.body = { id: 'invalid-id' };

            validateDogBodyMW(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid id' });
        });

        it('should return error for invalid gender', () => {
            req.body = { gender: 'unknown' };

            validateDogBodyMW(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid gender' });
        });

        it('should normalize gender to lowercase', () => {
            req.body = { gender: 'Male' };

            validateDogBodyMW(req as Request, res as Response, next);

            expect(req.body.gender).toBe('male');
            expect(next).toHaveBeenCalled();
        });

        it('should return error for invalid age', () => {
            req.body = { age: -1 };

            validateDogBodyMW(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid age' });
        });
    });

    describe('requiredDogBodyFieldMW', () => {
        it('should pass with valid fields', () => {
            req.body = { gender: 'male', age: 2 };

            requiredDogBodyFieldMW(req as Request, res as Response, next);

            expect(next).toHaveBeenCalled();
        });

        it('should return error for missing gender', () => {
            req.body = { age: 2 };

            requiredDogBodyFieldMW(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Gender is required and must be Male or Female',
            });
        });

        it('should return error for invalid gender', () => {
            req.body = { gender: 'unknown', age: 2 };

            requiredDogBodyFieldMW(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Gender is required and must be Male or Female',
            });
        });

        it('should return error for missing age', () => {
            req.body = { gender: 'male' };

            requiredDogBodyFieldMW(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Age is required and must be a positive number',
            });
        });
    });

    describe('validateAndConvertQueryMW', () => {
        it('should pass with valid query parameters', () => {
            req.query = { race: 'Labrador', minAge: '2', maxAge: '5', page: '1', itemsPerPage: '10' };

            validateAndConvertQueryMW(req as Request, res as Response, next);

            expect(req.queryFilters).toEqual({
                race: 'Labrador',
                minAge: 2,
                maxAge: 5,
                page: 1,
                itemsPerPage: 10,
            });
            expect(next).toHaveBeenCalled();
        });

        it('should return error for invalid page', () => {
            req.query = { page: '-1' };

            validateAndConvertQueryMW(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith('Invalid page');
        });

        it('should return error for invalid itemsPerPage', () => {
            req.query = { itemsPerPage: '200' };

            validateAndConvertQueryMW(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith('items per page must be max 100');
        });

        it('should return error for invalid minAge', () => {
            req.query = { minAge: 'invalid' };

            validateAndConvertQueryMW(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith('minAge must be a positive number');
        });

        it('should return error for invalid maxAge', () => {
            req.query = { maxAge: 'invalid' };

            validateAndConvertQueryMW(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith('maxAge must be a positive number');
        });
    });
});
