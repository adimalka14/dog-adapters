import { Express, NextFunction, Request, Response } from 'express';
import mainRouter from './main.router';
import dogRouter from './dog.router';
import usersRouter from './users.router';
import authRouter from './auth.router';

export const initAppRoutes = (app: Express) => {
    app.use('/', mainRouter);
    app.use('/dog', dogRouter);
    app.use('/users', usersRouter);
    app.use('/auth', authRouter);

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        next(err);
    });
};
