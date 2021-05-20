import { Request, Response, NextFunction } from 'express';
import expressPino from 'express-pino-logger';

export function loggerMiddleware (req: Request, res: Response, next: NextFunction): void {
  global.logger.debug('Calling res.send');
  next();
};

export const expressLogger = expressPino({ logger: global.logger });
