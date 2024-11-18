import app from './app';
import { connectDb } from './config/db.config';
import { PORT } from './utils/env-var';
import logger from './utils/logger';

connectDb()
    .then(() => {
        app.listen(PORT, () => {
            logger.info('SYSTEM', 'Server started', {
                url: `http://localhost:${PORT}`,
                port: PORT,
            });
        });
    })
    .catch((err: Error) => {
        logger.error('SYSTEM', 'Server failed with error', { err });
        process.exit(1);
    });
