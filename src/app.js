const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const compression = require('compression');
const morgan = require('morgan');

const passport = require('./config/passport.config');
const session = require('./config/session.config');
const { generalLimiterMW } = require('./middlewares/rateLimiter.mw');
const { initAppRoutes } = require('./routes');

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
app.use(generalLimiterMW);

initAppRoutes(app);

app.use((err, req, res, next) => {
    console.error(err);
    next(err);
});

module.exports = app;
