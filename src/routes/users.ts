// eslint-disable-next-line no-unused-vars
namespace UsersRoutes {
const { Router } = require('express');
const { makeValidateBody } = require('express-class-validator');

const { PutUser, PostUserUsd, PostUserBitcoins } = require('../utils/requests');
const { User } = require('../models/user');
const usersController = require('../controllers/users-controller');
const asyncHandler = require('express-async-error-handler');

const path = 'users';

module.exports.getUsersRoutes = function (router : InstanceType<typeof Router>) : InstanceType<typeof Router> {
  router.get(`/${path}/:id`, asyncHandler(usersController.getUserAsync));
  router.post(`/${path}/`, makeValidateBody(User), asyncHandler(usersController.postUserAsync));
  router.put(`/${path}/:id`, makeValidateBody(PutUser), asyncHandler(usersController.putUserAsync));
  router.get(`/${path}/:id/balance`, asyncHandler(usersController.getBalanceAsync));
  router.post(`/${path}/:id/usd`, makeValidateBody(PostUserUsd), asyncHandler(usersController.postUserUsdAsync));
  router.post(`/${path}/:id/bitcoins`, makeValidateBody(PostUserBitcoins), asyncHandler(usersController.postUserBitcoinsAsync));

  return router;
};

}
