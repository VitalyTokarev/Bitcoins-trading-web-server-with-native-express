const dotenv = require('dotenv');
const express = require('express');
const pino = require('pino');
const expressPino = require('express-pino-logger');

const router = require('./routes/index');
const { handleErrors } = require('./middlewares/global-error-handler');
require('./models/index');

const { Express } = express;

dotenv.config();

const port = process.env.PORT;
const logger = pino({ level: process.env.LOG_LEVEL || 'info' }, pino.destination('./src/logs/info.log'));
const expressLogger = expressPino({ logger });
const app: InstanceType<typeof Express> = express();

app.use(expressLogger);
app.use(express.json());
app.use((req, res, next) => {
  logger.debug('Calling res.send');
  next();
});
app.use('/', router);
app.use(handleErrors);
app.listen(port, () => logger.info(`Running on port ${port}`));
