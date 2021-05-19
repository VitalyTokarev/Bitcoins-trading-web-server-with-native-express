
import express, { Express, Router } from 'express';
import { getUsersRoutes } from './users';
import { getBitcoinRoutes } from './bitcoin';
import middlewares from '../middlewares';

const { expressLogger, handleErrors, loggerMiddleware } = middlewares;

const app: Express = express();
const router: Router = express.Router();

getUsersRoutes(router);
getBitcoinRoutes(router);

app.use(expressLogger);
app.use(express.json());
app.use(loggerMiddleware);
app.use('/', router);
app.use(handleErrors);

export default app;
