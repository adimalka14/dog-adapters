const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const compression = require('compression');
const morgan = require('morgan');

const mainRouter = require('./routes/main');
const dogRouter = require('./routes/dog');

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/main', mainRouter);
app.use('/dog', dogRouter);

app.use((err, req, res, next) => {
    console.error(err);
    next(err);
});

module.exports = app;
