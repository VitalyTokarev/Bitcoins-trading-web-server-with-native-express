import dotenv from 'dotenv';
import pino from 'pino';

dotenv.config();

const logger = pino({ level: process.env.LOG_LEVEL || 'info' }, pino.destination('./src/logs/info.log'));

global.logger = logger;
