import { connectDb } from '../config/db.config';
import mongoose from 'mongoose';

beforeAll(async () => {
    await connectDb();
});

afterAll(async () => {
    if (mongoose.connection && mongoose.connection.db) {
        await mongoose.connection.db.dropDatabase();
    }
    await mongoose.connection.close();
});
