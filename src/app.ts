import express from 'express';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import compression from 'compression';
import morgan from 'morgan';

import passport from './config/passport.config';
import session from './config/session.config';
import { generalLimiterMW } from './middlewares/rateLimiter.mw';
import { initAppRoutes } from './routes';

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

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    next(err);
});

export default app;
