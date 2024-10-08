import mongoose from 'mongoose';
import { MONGODB_URI } from '../utils/env-var';

export const connectDb = async (): Promise<void> => {
    if (!MONGODB_URI) {
        throw new Error('MongoDB URI is missing');
    }

    try {
        await mongoose.connect(MONGODB_URI);
        console.log(`MongoDB Connected`);
    } catch (err) {
        throw new Error('Failed to connect to MongoDB');
    }
};
