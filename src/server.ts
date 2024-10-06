import app from './app';
import { connectDb } from './config/db.config';
import { PORT } from './utils/env-var';

connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        });
    })
    .catch((err: Error) => {
        console.error(err.message);
        process.exit(1);
    });
