import { Router } from 'express';
import { makeValidateBody } from 'express-class-validator';

import { PutUser, PostUserUsd, PostUserBitcoins } from '../utils/requests';
import { User } from '../models/user';
import * as usersController from '../controllers/users-controller';
import asyncHandler from 'express-async-error-handler';

const path = 'users';

export function getUsersRoutes (router : Router) : Router {
  router.get(`/${path}/:id`, asyncHandler(usersController.getUserAsync));
  router.post(`/${path}/`, makeValidateBody(User), asyncHandler(usersController.postUserAsync));
  router.put(`/${path}/:id`, makeValidateBody(PutUser), asyncHandler(usersController.putUserAsync));
  router.get(`/${path}/:id/balance`, asyncHandler(usersController.getBalanceAsync));
  router.post(`/${path}/:id/usd`, makeValidateBody(PostUserUsd), asyncHandler(usersController.postUserUsdAsync));
  router.post(`/${path}/:id/bitcoins`, makeValidateBody(PostUserBitcoins), asyncHandler(usersController.postUserBitcoinsAsync));

  return router;
};
