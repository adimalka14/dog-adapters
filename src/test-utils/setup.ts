import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { NextFunction } from 'express';

jest.mock('express-rate-limit', () => {
    return jest.fn(() => (req: Request, res: Response, next: NextFunction) => next());
});

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri: string = mongoServer.getUri();

    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
    await mongoServer.stop();
});
