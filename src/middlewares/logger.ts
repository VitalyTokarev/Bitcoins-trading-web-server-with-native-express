import expressPino from 'express-pino-logger';

export const loggerMiddleware = (req, res, next) => {
  global.logger.debug('Calling res.send');
  next();
};

export const expressLogger = expressPino({ logger: global.logger });
