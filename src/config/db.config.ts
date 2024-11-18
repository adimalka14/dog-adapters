import mongoose from 'mongoose';
import { MONGODB_URI } from '../utils/env-var';
import logger from '../utils/logger';

export const connectDb = async (uri = MONGODB_URI): Promise<void> => {
    try {
        await mongoose.connect(uri as string);
        logger.info('SYSTEM', `MongoDB Connected`, { uri });
    } catch (err) {
        logger.error('SYSTEM', `MongoDB Connection Error`, { uri, err });
        throw new Error('Failed to connect to MongoDB');
    }
};
