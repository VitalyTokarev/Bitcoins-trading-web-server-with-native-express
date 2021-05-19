import dotenv from 'dotenv';
import express, { Express } from 'express';
import pino from 'pino';
import expressPino from 'express-pino-logger';

import router from './routes/index';
import { handleErrors } from './middlewares/global-error-handler';
import './models/index';

dotenv.config();

const port = process.env.PORT;
const logger = pino({ level: process.env.LOG_LEVEL || 'info' }, pino.destination('./src/logs/info.log'));
const expressLogger = expressPino({ logger });
const app: Express = express();

app.use(expressLogger);
app.use(express.json());
app.use((req, res, next) => {
  logger.debug('Calling res.send');
  next();
});
app.use('/', router);
app.use(handleErrors);
app.listen(port, () => logger.info(`Running on port ${port}`));
