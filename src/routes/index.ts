
import express from 'express';
import { getUsersRoutes } from './users';
import { getBitcoinRoutes } from './bitcoin';

const router = express.Router();

getUsersRoutes(router);
getBitcoinRoutes(router);

export default router;
