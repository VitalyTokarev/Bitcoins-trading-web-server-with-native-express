
import { Router } from 'express';
import { makeValidateBody } from 'express-class-validator';

import { PutBitcoin } from '../utils/requests';
import * as bitcoinController from '../controllers/bitcoin-controller';
import asyncHandler from 'express-async-error-handler';

const path = 'bitcoin';

export function getBitcoinRoutes (router : Router) : Router {
  router.get(`/${path}/`, asyncHandler(bitcoinController.getBitcoinAsync));
  router.put(`/${path}/`, makeValidateBody(PutBitcoin), asyncHandler(bitcoinController.putBitcoinAsync));

  return router;
};
