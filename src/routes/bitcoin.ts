// eslint-disable-next-line no-unused-vars
namespace BitcoinRoutes {
  const { Router } = require('express');
  const { makeValidateBody } = require('express-class-validator');

  const { PutBitcoin } = require('../utils/requests');
  const bitcoinController = require('../controllers/bitcoin-controller');
  const asyncHandler = require('express-async-error-handler');

  const path = 'bitcoin';

  module.exports.getBitcoinRoutes = function (router : InstanceType<typeof Router>) : InstanceType<typeof Router> {
    router.get(`/${path}/`, asyncHandler(bitcoinController.getBitcoinAsync));
    router.put(`/${path}/`, makeValidateBody(PutBitcoin), asyncHandler(bitcoinController.putBitcoinAsync));

    return router;
  };
}
