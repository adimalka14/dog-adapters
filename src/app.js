const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const compression = require('compression');
const morgan = require('morgan');

const passport = require('./config/passport');
const session = require('./config/session');
const { generalLimiter } = require('./config/rateLimiter');

const mainRouter = require('./routes/main');
const dogRouter = require('./routes/dog');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(generalLimiter);

app.use('/', mainRouter);
app.use('/dog', dogRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.use((err, req, res, next) => {
    console.error(err);
    next(err);
});

module.exports = app;
