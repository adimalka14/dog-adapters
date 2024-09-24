const mainRouter = require('./main.router');
const dogRouter = require('./dog.router');
const usersRouter = require('./users.router');
const authRouter = require('./auth.router');

module.exports.initAppRoutes = (app) => {
    app.use('/', mainRouter);
    app.use('/dog', dogRouter);
    app.use('/users', usersRouter);
    app.use('/auth', authRouter);
};
