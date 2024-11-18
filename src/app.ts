import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import compression from 'compression';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import { swaggerOptions } from './config/swagger.config';
import passport from './config/passport.config';
import session from './config/session.config';
import { generalLimiterMW } from './middlewares/rateLimiter.mw';
import { initAppRoutes } from './routes';
import { NODE_ENV } from './utils/env-var';
import requestID from './middlewares/requestID.mw';
import logApiMW from './middlewares/logAPI.mw';

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
app.use(requestID());
app.use(logApiMW);
if (NODE_ENV !== 'production') {
    const swaggerSpec = swaggerJsdoc(swaggerOptions);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

initAppRoutes(app);

export default app;
