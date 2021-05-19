// eslint-disable-next-line no-unused-vars
namespace Routes {
  const express = require('express');
  const { getUsersRoutes } = require('./users');
  const { getBitcoinRoutes } = require('./bitcoin');

  const router = express.Router();

  getUsersRoutes(router);
  getBitcoinRoutes(router);

  module.exports = router;
}
