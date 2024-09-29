import mainRouter from './main.router';
import dogRouter from './dog.router';
import usersRouter from './users.router';
import authRouter from './auth.router';

export const initAppRoutes = (app) => {
    app.use('/', mainRouter);
    app.use('/dog', dogRouter);
    app.use('/users', usersRouter);
    app.use('/auth', authRouter);
};
