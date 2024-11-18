import m2s from 'mongoose-to-swagger';
import { DogModel } from './dog.model';
import { UserModel } from './user.model';

export const swaggerSchemas = {
    Dog: m2s(DogModel),
    User: m2s(UserModel),
    Pagination: {
        type: 'Object',
        properties: {
            page: { type: 'number', required: true },
            totalItems: { type: 'number', required: true },
            itemsPerPage: { type: 'number' },
            totalPages: { type: 'number' },
        },
    },
};
